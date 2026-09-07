#!/usr/bin/env node
// Mostra o que a SUA chave libera. Rode isto antes de gerar qualquer coisa.

import {
  listarModelos,
  metodosDoModelo,
  modelosDeImagem,
  modelosDeVideo,
  nomeDoModelo,
  encerrarComErro,
} from './gemini.mjs';

try {
  const linha = (m) =>
    `  ${nomeDoModelo(m).padEnd(42)} ${metodosDoModelo(m).join(', ')}`;

  const todos = await listarModelos();
  const imagem = modelosDeImagem(todos);
  const video = modelosDeVideo(todos);

  console.log(`\n${todos.length} modelos nesta chave.\n`);
  console.log('IMAGEM (keyframes):');
  console.log(imagem.length ? imagem.map(linha).join('\n') : '  nenhum');
  console.log('\nVÍDEO (clipes):');
  console.log(video.length ? video.map(linha).join('\n') : '  nenhum');

  console.log('\nPara fixar a escolha, ponha no .env:');
  console.log(`  MODELO_IMAGEM=${imagem[0] ? nomeDoModelo(imagem[0]) : '<escolha acima>'}`);
  console.log(`  MODELO_VIDEO=${video[0] ? nomeDoModelo(video[0]) : '<escolha acima>'}`);
  console.log('\nSem essas variáveis, os scripts usam o primeiro da lista.\n');
} catch (e) {
  encerrarComErro(e);
}
