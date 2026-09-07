#!/usr/bin/env node
// Preenche o campo "clipe" de cada plano com o que existe em public/clipes/<slug>/.
// Plano sem clipe fica vazio de proposito: a composicao mostra placeholder.

import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
if (!slug) {
  console.error('uso: node scripts/vincular-clipes.mjs <slug>');
  process.exit(1);
}

const caminhoDados = join(RAIZ, 'dados', `${slug}.json`);
if (!existsSync(caminhoDados)) {
  console.error(`sem dados/${slug}.json`);
  process.exit(1);
}

const peca = JSON.parse(readFileSync(caminhoDados, 'utf8'));
let vinculados = 0;

for (const plano of peca.planos) {
  const relativo = `${slug}/P${plano.n}.mp4`;
  if (existsSync(join(RAIZ, 'public', 'clipes', relativo))) {
    plano.clipe = relativo;
    vinculados++;
  }
}

writeFileSync(caminhoDados, JSON.stringify(peca, null, 2) + '\n');
console.log(`${vinculados}/${peca.planos.length} planos com clipe em dados/${slug}.json`);
if (vinculados < peca.planos.length) {
  console.log('Os que faltam entram como placeholder numerado no preview.');
}
