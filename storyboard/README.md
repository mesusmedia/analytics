# Storyboard — Jogada Esportiva / Beto IA

Material de produção extraído dos 5 vídeos de referência e remodelado para
regerar as peças: bíblia de personagem e cenário travada, decupagem plano a
plano e prompts prontos de imagem e de animação.

```
storyboard/
├── 00-PIPELINE.md            fluxo roteiro → keyframe → animação → montagem
├── 01-BIBLIA-PERSONAGENS.md  9 personagens, blocos de prompt travados
├── 02-CENARIOS.md            10 sets, blocos de prompt travados
├── roteiros/                 decupagem + prompts, 1 arquivo por vídeo
└── referencias/
    ├── frames/               52 frames, 1 por plano detectado
    ├── contact-sheets/       1 folha de contato por vídeo
    └── decupagem.json        timecodes de corte detectados automaticamente
```

## Como usar

1. Gere as folhas de personagem (`01-BIBLIA`, seção final). **Uma vez, antes de tudo.**
2. Abra o roteiro do vídeo em `roteiros/`.
3. Cole cada prompt de keyframe no gerador de imagem, com a folha do personagem
   como imagem de referência. Substitua `[STYLE_BLOCK]`, `[CHAR_*]` e `[SET_*]`
   pelo texto literal da bíblia.
4. Leve cada keyframe para o gerador de vídeo com o prompt de animação da tabela.
5. Monte na ordem da tabela, com o rodapé de conformidade visível o tempo todo.

## Agentes

Definidos em `.claude/agents/`. Encadeie nesta ordem:

| Agente | Entrada | Saída |
|---|---|---|
| `roteirista-ugc` | briefing / persona | roteiro em `roteiros/` |
| `diretor-storyboard` | roteiro | tabela de planos com timecode |
| `prompt-imagem` | tabela de planos | prompts de keyframe |
| `prompt-animacao` | keyframes | prompts de movimento + lista de montagem |

Exemplo: `Use o agente roteirista-ugc para escrever a versão do entregador de app,
depois o diretor-storyboard para decupar em 10 planos de até 7s.`

## Conformidade

Toda peça carrega, obrigatoriamente:
`MINISTÉRIO DA FAZENDA ADVERTE: APOSTA NÃO É INVESTIMENTO.` + licença SPA/MF +
selo 18+ + "jogue com responsabilidade". Sem promessa de ganho garantido.

## Como os frames foram extraídos

Detecção de corte por diferença de histograma HSV (Bhattacharyya > 0.22, intervalo
mínimo de 1.2s), 1 frame representativo no meio de cada plano. Script em
`00-PIPELINE.md` não é necessário para reproduzir — os frames já estão versionados.
