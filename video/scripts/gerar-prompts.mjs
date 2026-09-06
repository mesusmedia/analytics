#!/usr/bin/env node
// Monta os prompts de keyframe e animacao de uma peca, expandindo os tokens
// [STYLE_BLOCK], [CHAR_*], [SET_*] e [CAPA_*] com o texto literal da biblia.
//
//   node scripts/gerar-prompts.mjs ../storyboard/roteiros/01-neri.md

import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {basename, dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const STORYBOARD = join(RAIZ, 'storyboard');

// Tokens sao escritos com e sem acento entre a biblia e os roteiros
// (CHAR_ZEZÃO vs [CHAR_ZEZAO]). Comparamos sempre pela forma sem acento.
const chave = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();

const semCitacao = (texto) => texto.replace(/^> ?/gm, '');

function lerDefinicoes() {
  const defs = new Map();
  const registrar = (nome, valor) =>
    defs.set(chave(nome), valor.replace(/\s+/g, ' ').trim());

  for (const arquivo of ['01-BIBLIA-PERSONAGENS.md', '02-CENARIOS.md']) {
    const texto = semCitacao(readFileSync(join(STORYBOARD, arquivo), 'utf8'));

    // **STYLE_BLOCK** — `...`  e  **CHAR_LUIS** — `...`
    for (const m of texto.matchAll(/\*\*([A-Z][A-Z_À-Ú]*)\*\*\s*—?\s*`([^`]+)`/g)) {
      registrar(m[1], m[2]);
    }
    // ## SET_ESTOQUE (V1)  seguido de  `...`
    for (const m of texto.matchAll(/^##\s+(SET_[A-Z_À-Ú]+)[^\n]*\n+`([^`]+)`/gm)) {
      registrar(m[1], m[2]);
    }
  }

  // Fichas dos tipsters: [CAPA_NERI] nao e texto, e a capa original do grupo
  // anexada como imagem de referencia. Expandimos para a frase que instrui o
  // gerador a usar a imagem anexa, e devolvemos o caminho para anexar.
  const capas = new Map();
  const tipsters = readFileSync(join(STORYBOARD, '03-TIPSTERS.md'), 'utf8');
  for (const m of tipsters.matchAll(/^###\s+\d+\.\s+([A-Z0-9ÀÁÂÃÉÊÍÓÔÕÚÇ ]+?)\s+—\s+`([^`]+)`/gm)) {
    const nome = m[1].trim();
    const grupo = m[2].trim();
    const slugCapa = grupo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    registrar(`CAPA_${nome.replace(/\s+/g, '_')}`, `the attached "${grupo}" cover photo`);
    capas.set(chave(`CAPA_${nome.replace(/\s+/g, '_')}`), `referencias/capas/${slugCapa}.jpg`);
  }
  defs.capas = capas;

  if (!defs.has('STYLE_BLOCK')) {
    throw new Error('STYLE_BLOCK nao encontrado na biblia de personagens');
  }
  return defs;
}

function lerRoteiro(caminho) {
  const bruto = readFileSync(caminho, 'utf8');
  const texto = semCitacao(bruto);

  const campo = (rotulo) =>
    texto.match(new RegExp(`^\\*\\*${rotulo}:\\*\\*\\s*(.+)$`, 'm'))?.[1].trim() ?? '';

  const keyframes = [...texto.matchAll(
    /\*\*P(\d+)\s*·\s*([^*\n]+)\*\*\s*\n+```\n([\s\S]*?)\n```/g,
  )].map((m) => ({
    n: Number(m[1]),
    titulo: m[2].trim(),
    prompt: m[3].replace(/\s+/g, ' ').trim(),
  }));

  const animacoes = new Map();
  for (const m of texto.matchAll(/^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*(\d+(?:\.\d+)?)s\s*\|/gm)) {
    animacoes.set(Number(m[1]), {
      movimento: m[2].replace(/\s+/g, ' ').trim(),
      dur: Number(m[3]),
    });
  }

  const planos = [...texto.matchAll(
    /^\|\s*(\d+)\s*\|\s*([\d.]+)–([\d.]+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/gm,
  )].map((m) => ({
    n: Number(m[1]),
    inicio: Number(m[2]),
    fim: Number(m[3]),
    plano: m[4].trim(),
    acao: m[5].trim(),
    legenda: m[6].trim(),
  }));

  // Falas opcionais. Bloco cercado com a encenacao inteira do plano falado —
  // quando existe, ele substitui o movimento seco da tabela de animacao.
  const falas = new Map();
  for (const m of texto.matchAll(/\*\*Fala P(\d+)\*\*\s*\n+```\n([\s\S]*?)\n```/g)) {
    falas.set(Number(m[1]), m[2].trim());
  }

  // Personagens declarados na propria peca sobrescrevem a biblia
  const locais = new Map();
  for (const m of texto.matchAll(/\*\*(CHAR_[A-Z_À-Ú]+)\*\*\s*\n+`([^`]+)`/g)) {
    locais.set(chave(m[1]), m[2].replace(/\s+/g, ' ').trim());
  }

  return {
    titulo: texto.match(/^#\s+(.+)$/m)?.[1].trim() ?? basename(caminho, '.md'),
    tipster: campo('Tipster'),
    gancho: campo('Gancho'),
    keyframes,
    animacoes,
    planos,
    falas,
    locais,
  };
}

function expandir(prompt, defs, faltando, anexos) {
  return prompt.replace(/\[([A-Z][A-Z_0-9À-Ú]*)\]/g, (bruto, token) => {
    const valor = defs.get(chave(token));
    if (valor) {
      const capa = defs.capas?.get(chave(token));
      if (capa) anexos.add(capa);
      return valor;
    }
    faltando.add(token);
    return bruto;
  });
}

const NEGATIVO =
  'cartoon flat, anime, deformed hands, extra fingers, text overlay, logo, ' +
  'watermark, low detail background, plastic uncanny skin';

const DIRETIVA_IDIOMA =
  'Spoken language: Brazilian Portuguese (pt-BR). All dialogue must be in ' +
  'Brazilian Portuguese — never English.';

function folhaDePersonagem(styleBlock, descricao) {
  return (
    `${styleBlock.replace(/, vertical 9:16 composition/, '')}. ` +
    `Character turnaround sheet of: ${descricao}. Three views side by side on a ` +
    'neutral grey seamless background: front view, three-quarter view, side profile, ' +
    'full body, neutral expression, even soft studio lighting, consistent proportions, ' +
    'model sheet, 16:9. No text, no watermark.'
  );
}

function main() {
  const alvo = process.argv[2];
  if (!alvo) {
    console.error('uso: node scripts/gerar-prompts.mjs <roteiro.md>');
    process.exit(1);
  }

  const caminho = resolve(alvo);
  const slug = basename(caminho, '.md');
  const defs = lerDefinicoes();
  const roteiro = lerRoteiro(caminho);
  for (const [k, v] of roteiro.locais) defs.set(k, v);

  const saida = join(STORYBOARD, 'prompts', slug);
  mkdirSync(saida, {recursive: true});

  const faltando = new Set();
  const anexos = new Set();
  const style = defs.get('STYLE_BLOCK');
  const escrever = (nome, conteudo) =>
    writeFileSync(join(saida, nome), conteudo.trimEnd() + '\n');

  for (const [token, descricao] of roteiro.locais) {
    const nome = token.replace(/^CHAR_/, '');
    escrever(`FOLHA-${nome}.txt`, folhaDePersonagem(style, descricao));
  }

  for (const kf of roteiro.keyframes) {
    escrever(`P${kf.n}-keyframe.txt`, expandir(kf.prompt, defs, faltando, anexos));

    const anim = roteiro.animacoes.get(kf.n);
    if (!anim) continue;
    const fala = roteiro.falas.get(kf.n);
    escrever(
      `P${kf.n}-animacao.txt`,
      fala ? `${DIRETIVA_IDIOMA}\n\n${fala}` : anim.movimento,
    );
  }

  const linhas = [
    `# Prompts prontos — ${roteiro.titulo}`,
    '',
    'Cole exatamente como está. Nada a substituir.',
    '',
    `**Negativo padrão (onde couber):** \`${NEGATIVO}\``,
    '',
  ];

  if (anexos.size) {
    linhas.push('**Anexe como imagem de referência:**', '');
    for (const a of anexos) linhas.push(`- \`storyboard/${a}\``);
    linhas.push('');
  }

  for (const [token, descricao] of roteiro.locais) {
    const nome = token.replace(/^CHAR_/, '');
    linhas.push(`## Folha de personagem · ${nome}`, '```', folhaDePersonagem(style, descricao), '```', '');
  }

  for (const kf of roteiro.keyframes) {
    const plano = roteiro.planos.find((p) => p.n === kf.n);
    const anim = roteiro.animacoes.get(kf.n);
    linhas.push(`## P${kf.n} · ${kf.titulo}`);
    if (plano) linhas.push(`_${plano.acao}_`, '');
    linhas.push('**Keyframe**', '```', expandir(kf.prompt, defs, faltando, anexos), '```', '');
    if (anim) {
      const fala = roteiro.falas.get(kf.n);
      linhas.push('**Animação**', '```');
      if (fala) linhas.push(DIRETIVA_IDIOMA, '', fala);
      else linhas.push(anim.movimento);
      linhas.push('```', '');
    }
  }

  escrever('README.md', linhas.join('\n'));

  const total = roteiro.keyframes.length;
  console.log(`${slug}: ${total} keyframes, ${roteiro.animacoes.size} animações, ` +
    `${roteiro.locais.size} folhas → storyboard/prompts/${slug}/`);
  for (const a of anexos) console.log(`  anexar: storyboard/${a}`);
  if (faltando.size) {
    console.error(`AVISO: tokens sem definição na bíblia: ${[...faltando].join(', ')}`);
    process.exitCode = 2;
  }
}

main();
