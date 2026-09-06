# video

Composicoes Remotion e preview com `@remotion/player` para os videos verticais
descritos em `../storyboard`.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run preview` | Sobe o Vite com o `<Player />` embutido (http://localhost:5173) |
| `npm run studio` | Abre o Remotion Studio |
| `npm run render` | Renderiza `Historinha` em `out/historinha.mp4` |
| `npm run prompts <roteiro.md>` | Monta os prompts de keyframe e animacao da peca |
| `npm run typecheck` | Roda o `tsc` sem emitir |

## Estrutura

- `src/index.ts` — `registerRoot` do Remotion
- `src/Root.tsx` — composicoes registradas (1080x1920, 30fps)
- `src/pecas.ts` — schema zod da peca e helpers de duracao
- `src/Historinha.tsx` — a peca inteira, dirigida por dados
- `src/Plano.tsx` — um plano: clipe (ou placeholder) + legenda
- `src/Legenda.tsx` — legenda karaoke, palavra a palavra
- `src/Rodape.tsx` — rodape de conformidade, fixo em 100% do tempo
- `dados/<slug>.json` — uma peca por arquivo
- `scripts/gerar-prompts.mjs` — expande [STYLE_BLOCK], [CHAR_*], [SET_*], [CAPA_*]
- `public/clipes/`, `public/capas/` — clipes gerados e capas dos grupos

## Peca nova

1. `npm run prompts ../storyboard/roteiros/<slug>.md` — sai tudo em
   `storyboard/prompts/<slug>/`, pronto pra colar.
2. Gere os keyframes e os clipes; salve em `public/clipes/` como `P1.mp4`...
3. Copie `dados/01-neri.json`, troque os campos e preencha `clipe` de cada plano.
4. `npm run preview` pra revisar, `npm run render` pra fechar.

Plano sem `clipe` vira placeholder numerado — da pra fechar o ritmo e o corte
antes de gastar geracao.

## Variacao de gancho

```bash
npx remotion render Historinha out/neri-v2.mp4 --props=dados/01-neri-v2.json
```

Mesma composicao, JSON diferente. Testar cinco ganchos nao e cinco edicoes.
