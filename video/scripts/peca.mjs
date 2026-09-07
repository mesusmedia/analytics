#!/usr/bin/env node
// A peca inteira, de uma vez: prompts -> keyframes -> clipes -> vinculo -> mp4.
// Para com codigo != 0 na primeira etapa que falhar, para o orquestrador ver.
//
//   npm run peca 01-neri
//   npm run peca 01-neri --ate keyframes    (para depois dos keyframes, pra conferir)

import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const VIDEO = resolve(AQUI, '..');
const RAIZ = resolve(VIDEO, '..');

const [slug, ...resto] = process.argv.slice(2);
if (!slug) {
  console.error('uso: npm run peca <slug> [--ate prompts|keyframes|clipes|render]');
  process.exit(1);
}

const i = resto.indexOf('--ate');
const ate = i >= 0 ? resto[i + 1] : 'render';

const roteiro = join(RAIZ, 'storyboard', 'roteiros', `${slug}.md`);
if (!existsSync(roteiro)) {
  console.error(`\nSem roteiro em storyboard/roteiros/${slug}.md.`);
  console.error('Escreva o roteiro primeiro (agente roteirista-ugc + diretor-storyboard).\n');
  process.exit(1);
}

const etapas = [
  {nome: 'prompts', cmd: ['node', ['scripts/gerar-prompts.mjs', roteiro]]},
  {nome: 'keyframes', cmd: ['node', ['scripts/gerar-keyframes.mjs', slug]]},
  {nome: 'clipes', cmd: ['node', ['scripts/gerar-clipes.mjs', slug]]},
  {nome: 'vinculo', cmd: ['node', ['scripts/vincular-clipes.mjs', slug]]},
  {
    nome: 'render',
    cmd: ['npx', ['remotion', 'render', 'Historinha', `out/${slug}.mp4`,
      `--props=dados/${slug}.json`]],
  },
];

const parada = etapas.findIndex((e) => e.nome === ate);
const ordem = parada >= 0 ? etapas.slice(0, parada + 1) : etapas;

for (const etapa of ordem) {
  console.log(`\n━━ ${etapa.nome} ━━`);
  const [bin, args] = etapa.cmd;
  const r = spawnSync(bin, args, {cwd: VIDEO, stdio: 'inherit', env: process.env});
  if (r.status !== 0) {
    console.error(`\nParou em "${etapa.nome}" (código ${r.status}). Nada depois disso rodou.\n`);
    process.exit(r.status ?? 1);
  }
}

console.log(`\n✓ ${slug} — até "${ordem.at(-1).nome}"\n`);
