# Pipeline: roteiro → storyboard → keyframe → animação

Fluxo usado para remodelar os 5 vídeos de referência em historinhas de **grupo
de tipster** — uma peça por tipster, personagem derivado da capa do grupo.

```
0. FICHA DO TIPSTER  capa do grupo → bloco travado   → 03-TIPSTERS.md
1. ROTEIRO           texto + falas + gancho          → roteiros/<tipster>.md
2. DECUPAGEM         quebra em planos + timecode     → roteiros/Vx.md (tabela)
3. BÍBLIA VISUAL     personagem + cenário travados   → 01-BIBLIA / 02-CENARIOS
4. KEYFRAME          1 imagem por plano (9:16)       → gerador de imagem
5. ANIMAÇÃO          image-to-video 5-8s por plano   → gerador de vídeo
6. VOZ + TRILHA      locução pt-BR + SFX             → TTS
7. MONTAGEM          corte, legenda karaokê, selo    → editor
```

## Regra de ouro da consistência

O personagem só se mantém igual entre planos se você:

1. Gerar **uma folha de personagem** (turnaround: frente, 3/4, perfil) **antes** de qualquer cena.
2. Usar essa folha como **imagem de referência** em todos os keyframes seguintes.
3. Repetir o **bloco de texto travado** da bíblia, palavra por palavra, em cada prompt.
4. Nunca deixar o gerador "reinterpretar" roupa, crachá, cor de cabelo — descreva sempre.

## Ferramentas por etapa

| Etapa | Opções | Observação |
|---|---|---|
| Keyframe | Nano Banana (Gemini Image), Seedream 4, Midjourney v7 `--cref`, Flux Kontext | Nano Banana e Flux Kontext são os melhores para *manter* o mesmo personagem |
| Folha de personagem | mesmo gerador, prompt de turnaround | gerar 1x e reusar sempre |
| Animação | Kling 2.5, Veo 3.1, Runway Gen-4, Hailuo | image-to-video, 5–8s por plano |
| Lip sync | Veo 3.1 (áudio nativo), Hedra, Sync.so | Veo já entrega fala + som |
| Voz pt-BR | ElevenLabs, Fish Audio | 1 voz por personagem, travar o voice ID |
| Montagem | CapCut, Premiere | legenda karaokê amarelo/branco, selo 18+ |

## Custo aproximado por vídeo de 60s

- ~10 planos → 10 keyframes + 10 clipes de 6s
- Keyframes: barato (centavos por imagem)
- Animação: o gargalo de custo — orce por segundo gerado
- Sempre gere 2–3 variações do plano de abertura (é onde o público decide ficar)

## Limite deste ambiente

Este ambiente **não gera imagem nem vídeo**. O que está versionado aqui é o
material que alimenta os geradores: decupagem, bíblia travada e prompts prontos
para colar. Geração de pixel acontece na ferramenta externa.
