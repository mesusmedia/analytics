#!/usr/bin/env node
// Gera os clipes a partir dos keyframes + prompts de movimento.
// Geracao de video e operacao longa: disparamos e ficamos em polling.
//
//   node scripts/gerar-clipes.mjs 01-neri
//   node scripts/gerar-clipes.mjs 01-neri --plano 3 --forcar

import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  chamar,
  chave,
  encerrarComErro,
  escolher,
  listarModelos,
  modelosDeVideo,
  nomeDoModelo,
} from './gemini.mjs';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

function argumentos() {
  const [slug, ...resto] = process.argv.slice(2);
  if (!slug) {
    console.error('uso: node scripts/gerar-clipes.mjs <slug> [--plano N] [--forcar]');
    process.exit(1);
  }
  const i = resto.indexOf('--plano');
  return {
    slug,
    plano: i >= 0 ? Number(resto[i + 1]) : null,
    forcar: resto.includes('--forcar'),
  };
}

/** Duracoes vivem no JSON da peca — a mesma fonte que a composicao Remotion usa. */
function duracoes(slug) {
  const dados = join(RAIZ, 'video', 'dados', `${slug}.json`);
  if (!existsSync(dados)) return new Map();
  const peca = JSON.parse(readFileSync(dados, 'utf8'));
  return new Map(peca.planos.map((p) => [p.n, p.dur]));
}

async function aguardar(operacao, rotulo) {
  let atual = operacao;
  const limite = Date.now() + 20 * 60 * 1000;

  while (!atual.done) {
    if (Date.now() > limite) throw new Error(`${rotulo}: passou de 20min, desisti`);
    await espera(10_000);
    process.stdout.write('.');
    atual = await chamar(atual.name);
  }
  if (atual.error) {
    throw new Error(`${rotulo}: ${atual.error.message ?? JSON.stringify(atual.error)}`);
  }
  return atual.response;
}

/** A resposta traz bytes inline ou uma URI para baixar — aceitamos as duas. */
async function baixarVideo(resposta) {
  const pilha = [resposta];
  while (pilha.length) {
    const no = pilha.pop();
    if (!no || typeof no !== 'object') continue;
    if (typeof no.bytesBase64Encoded === 'string') {
      return Buffer.from(no.bytesBase64Encoded, 'base64');
    }
    const uri = no.uri ?? no.videoUri ?? no.gcsUri;
    if (typeof uri === 'string' && /^https?:/.test(uri)) {
      const r = await fetch(uri, {headers: {'x-goog-api-key': chave()}});
      if (!r.ok) throw new Error(`download ${r.status} de ${uri}`);
      return Buffer.from(await r.arrayBuffer());
    }
    pilha.push(...Object.values(no));
  }
  throw new Error(`resposta sem vídeo: ${JSON.stringify(resposta).slice(0, 300)}`);
}

try {
  const {slug, plano: sozinho, forcar} = argumentos();

  const pastaPrompts = join(RAIZ, 'storyboard', 'prompts', slug);
  const pastaKeyframes = join(RAIZ, 'video', 'public', 'keyframes', slug);
  if (!existsSync(pastaKeyframes)) {
    throw new Error(`sem keyframes para "${slug}". Rode antes: npm run keyframes ${slug}`);
  }

  const modelo = escolher(
    modelosDeVideo(await listarModelos()),
    process.env.MODELO_VIDEO,
    'vídeo',
  );
  console.log(`modelo de vídeo: ${nomeDoModelo(modelo)}`);

  const saida = join(RAIZ, 'video', 'public', 'clipes', slug);
  mkdirSync(saida, {recursive: true});
  const durs = duracoes(slug);

  const planos = readdirSync(pastaKeyframes)
    .filter((f) => /^P\d+\.png$/.test(f))
    .map((f) => Number(f.match(/\d+/)[0]))
    .sort((a, b) => a - b);

  let feitos = 0;
  for (const n of planos) {
    if (sozinho && n !== sozinho) continue;

    const destino = join(saida, `P${n}.mp4`);
    if (existsSync(destino) && !forcar) {
      console.log(`P${n}: já existe, pulando (use --forcar para refazer)`);
      continue;
    }

    const promptPath = join(pastaPrompts, `P${n}-animacao.txt`);
    if (!existsSync(promptPath)) {
      console.log(`P${n}: sem prompt de animação, pulando`);
      continue;
    }

    const imagem = readFileSync(join(pastaKeyframes, `P${n}.png`)).toString('base64');
    const parametros = {aspectRatio: '9:16', sampleCount: 1};
    const dur = durs.get(n);
    if (dur) parametros.durationSeconds = Math.round(dur);

    process.stdout.write(`P${n}: gerando${dur ? ` ${Math.round(dur)}s` : ''}`);
    try {
      const operacao = await chamar(`models/${nomeDoModelo(modelo)}:predictLongRunning`, {
        metodo: 'POST',
        corpo: {
          instances: [{
            prompt: readFileSync(promptPath, 'utf8').trim(),
            image: {bytesBase64Encoded: imagem, mimeType: 'image/png'},
          }],
          parameters: parametros,
        },
      });
      writeFileSync(destino, await baixarVideo(await aguardar(operacao, `P${n}`)));
      console.log(' ok');
      feitos++;
    } catch (e) {
      console.log(`\nP${n}: FALHOU — ${e.message}`);
    }
  }

  console.log(`\n${feitos} clipe(s) em video/public/clipes/${slug}/`);
  console.log(`Preencha "clipe" em video/dados/${slug}.json e rode: npm run preview`);
} catch (e) {
  encerrarComErro(e);
}
