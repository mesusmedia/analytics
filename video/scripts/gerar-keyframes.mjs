#!/usr/bin/env node
// Gera os 9 keyframes de uma peca a partir dos prompts ja montados.
//
//   node scripts/gerar-keyframes.mjs 01-neri
//   node scripts/gerar-keyframes.mjs 01-neri --plano 5 --forcar

import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  chamar,
  escolher,
  listarModelos,
  metodosDoModelo,
  modelosDeImagem,
  nomeDoModelo,
  encerrarComErro,
} from './gemini.mjs';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

function argumentos() {
  const [slug, ...resto] = process.argv.slice(2);
  if (!slug) {
    console.error('uso: node scripts/gerar-keyframes.mjs <slug> [--plano N] [--forcar]');
    process.exit(1);
  }
  const i = resto.indexOf('--plano');
  return {
    slug,
    plano: i >= 0 ? Number(resto[i + 1]) : null,
    forcar: resto.includes('--forcar'),
  };
}

/** Referencias visuais: folhas de personagem e a capa do grupo. */
function referencias(pastaPrompts) {
  const refs = [];
  for (const f of readdirSync(pastaPrompts)) {
    if (!f.startsWith('FOLHA-')) continue;
    const png = join(RAIZ, 'storyboard', 'referencias', 'chars',
      f.replace(/^FOLHA-/, 'char_').replace(/\.txt$/, '.png').toLowerCase());
    if (existsSync(png)) refs.push(png);
  }
  return refs;
}

const mime = (p) => (p.endsWith('.png') ? 'image/png' : 'image/jpeg');

function extrairImagem(resposta) {
  const partes = resposta?.candidates?.[0]?.content?.parts ?? [];
  const img = partes.find((p) => p.inlineData?.data);
  if (img) return Buffer.from(img.inlineData.data, 'base64');

  const pred = resposta?.predictions?.[0];
  const b64 = pred?.bytesBase64Encoded ?? pred?.image?.bytesBase64Encoded;
  if (b64) return Buffer.from(b64, 'base64');

  const texto = partes.find((p) => p.text)?.text;
  throw new Error(
    'resposta sem imagem' + (texto ? ` — o modelo respondeu texto: ${texto.slice(0, 200)}` : ''),
  );
}

async function gerar(modelo, prompt, refs) {
  const usaGenerateContent = metodosDoModelo(modelo).includes('generateContent');
  const nome = nomeDoModelo(modelo);

  if (usaGenerateContent) {
    const parts = [
      ...refs.map((p) => ({
        inlineData: {mimeType: mime(p), data: readFileSync(p).toString('base64')},
      })),
      {text: prompt},
    ];
    return extrairImagem(
      await chamar(`models/${nome}:generateContent`, {
        metodo: 'POST',
        corpo: {
          contents: [{role: 'user', parts}],
          generationConfig: {responseModalities: ['IMAGE']},
        },
      }),
    );
  }

  return extrairImagem(
    await chamar(`models/${nome}:predict`, {
      metodo: 'POST',
      corpo: {
        instances: [{prompt}],
        parameters: {sampleCount: 1, aspectRatio: '9:16'},
      },
    }),
  );
}

const {slug, plano: sozinho, forcar} = argumentos();
const pastaPrompts = join(RAIZ, 'storyboard', 'prompts', slug);
if (!existsSync(pastaPrompts)) {
  console.error(`sem prompts para "${slug}". Rode antes: npm run prompts ../storyboard/roteiros/${slug}.md`);
  process.exit(1);
}

try {
  const modelo = escolher(
    modelosDeImagem(await listarModelos()),
    process.env.MODELO_IMAGEM,
    'imagem',
  );
  console.log(`modelo de imagem: ${nomeDoModelo(modelo)}`);

  const refs = referencias(pastaPrompts);
  console.log(refs.length ? `referências: ${refs.length}` : 'sem folha de personagem — consistência vai sofrer');

  const saida = join(RAIZ, 'video', 'public', 'keyframes', slug);
  mkdirSync(saida, {recursive: true});

  const arquivos = readdirSync(pastaPrompts)
    .filter((f) => /^P\d+-keyframe\.txt$/.test(f))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

  let feitos = 0;
  for (const arquivo of arquivos) {
    const n = Number(arquivo.match(/\d+/)[0]);
    if (sozinho && n !== sozinho) continue;

    const destino = join(saida, `P${n}.png`);
    if (existsSync(destino) && !forcar) {
      console.log(`P${n}: já existe, pulando (use --forcar para refazer)`);
      continue;
    }

    const prompt = readFileSync(join(pastaPrompts, arquivo), 'utf8').trim();
    process.stdout.write(`P${n}: gerando… `);
    try {
      writeFileSync(destino, await gerar(modelo, prompt, refs));
      console.log('ok');
      feitos++;
    } catch (e) {
      console.log(`FALHOU — ${e.message}`);
    }
  }

  console.log(`\n${feitos} keyframe(s) em video/public/keyframes/${slug}/`);
  console.log('Olhe as imagens antes de gerar clipe. Personagem inconsistente aqui vira clipe perdido.');
} catch (e) {
  encerrarComErro(e);
}
