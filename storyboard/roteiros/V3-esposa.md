# V3 — "A esposa dele não acreditou" (45s · 5 planos)

**Gancho (0–8s):** cartela + esposa de braços cruzados.
**Personagens:** MARCOS, SANDRA.
**Sets:** SET_SALA_NATAL, SET_PACKSHOT.
**Arco:** ceticismo doméstico → demonstração → conversão.
**Nota:** é o roteiro mais curto e o de planos mais longos (8–15s). Ideal para
lip sync — quase não tem corte, então a atuação carrega tudo.

| # | TC | Plano | Ação | Legenda |
|---|---|---|---|---|
| 1 | 0.0–8.1 | Dois personagens, médio | Marcos mostra o celular, Sandra de braços cruzados | PASSAGEIRO ME RECOMENDOU |
| 2 | 8.1–16.1 | Close forte em Marcos | Ele defende o app | EU NÃO FAÇO |
| 3 | 16.1–31.0 | Dois personagens, aberto | Marcos explica, Sandra desarma | PRA CONVERSAR COM |
| 4 | 31.0–39.1 | Dois personagens, celular aceso | Revelação da tela verde | DO BRASILEIRÃO |
| 5 | 39.1–44.9 | Pack shot | App + CTA | Nº1 PRA APOSTAS |

---

## Prompts de keyframe

**P1**
```
[STYLE_BLOCK], two-shot in [SET_SALA_NATAL], [CHAR_MARCOS] on the right holding a
smartphone up with the screen facing camera, warm eager expression, [CHAR_SANDRA] on the
left with arms crossed and a skeptical raised eyebrow, they stand behind a grey sofa,
fairy lights and bookshelf behind them, golden ambient light, 9:16
```

**P2**
```
[STYLE_BLOCK], tight close-up of [CHAR_MARCOS] in [SET_SALA_NATAL], face filling the
frame, mid-sentence with an earnest expression, colourful window bokeh completely out of
focus behind him, warm key light from the left, 9:16
```

**P3**
```
[STYLE_BLOCK], wider two-shot in [SET_SALA_NATAL], [CHAR_MARCOS] on the right turned
toward [CHAR_SANDRA] on the left, he holds the phone between them with a cyan-green glow,
her arms are still crossed but her expression has softened into curiosity, full living
room visible with fireplace and window, 9:16
```

**P4**
```
[STYLE_BLOCK], same two-shot in [SET_SALA_NATAL] but the phone screen now blazes bright
green, casting green light across both faces, [CHAR_SANDRA] leans in with wide eyes,
[CHAR_MARCOS] smiles knowingly, the warm room light and the green screen light collide, 9:16
```

**P5**
```
[STYLE_BLOCK], [SET_PACKSHOT], 9:16
```

---

## Prompts de animação

| # | Prompt de movimento | Dur |
|---|---|---|
| 1 | `slow push-in on the pair, the man raises the phone and talks, the woman shakes her head slightly, lip sync` | 8s |
| 2 | `very slow push-in on the close-up, he speaks with conviction, natural blinking and head movement, lip sync` | 8s |
| 3 | `static wide, he turns toward her and gestures at the phone, she uncrosses her arms halfway, lip sync on both` | 8s |
| 4 | `the phone screen brightens and the green light spreads over both faces, she leans in, he smiles` | 8s |
| 5 | `the phone rotates in 3D, footballs and green check marks orbit, light streaks sweep across` | 6s |

> Planos de 8s exigem gerador com boa continuidade de fala (Veo 3.1). Em geradores
> de 5s, corte cada plano em dois e reaproveite o último frame como novo keyframe.
