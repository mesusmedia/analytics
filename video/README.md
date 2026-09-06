# video

Composicoes Remotion e preview com `@remotion/player` para os videos verticais
descritos em `../storyboard`.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run preview` | Sobe o Vite com o `<Player />` embutido (http://localhost:5173) |
| `npm run studio` | Abre o Remotion Studio |
| `npm run render` | Renderiza a composicao `Legenda` em `out/legenda.mp4` |
| `npm run typecheck` | Roda o `tsc` sem emitir |

## Estrutura

- `src/index.ts` — `registerRoot` do Remotion
- `src/Root.tsx` — composicoes registradas (1080x1920, 30fps)
- `src/Legenda.tsx` — legenda karaoke, palavra a palavra
- `src/preview/Preview.tsx` — uso do `@remotion/player` fora do Studio
