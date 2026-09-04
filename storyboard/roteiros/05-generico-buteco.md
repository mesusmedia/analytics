# Genérico B — a mesa do buteco

**Tipster:** <GRUPO> · grupo `<nome do grupo>` no Telegram
**Duração:** ~58s · 9 planos · 9:16
**Gancho:** A MESA INTEIRA ERRAVA O MESMO PALPITE
**Arco:** palpite de mesa → um deles cita o grupo → prova na tela → a mesa inteira entra
**Sets:** `SET_BUTECO` · `SET_BUTECO` · `SET_TELA_GRUPO` · pack shot

## Personagens desta peça

**CHAR_TIÃO**
> `Brazilian man, 47, brown skin, greying short hair, thick moustache, faded football club polo shirt, forearms on the bar counter, weathered good-natured face`

**CHAR_BIGODE**
> `Brazilian man, 50, light brown skin, bald on top with grey sides, enormous white moustache, checked short-sleeve shirt open over a white tank top, loud laugh`

> O tipster **não** é modelado como personagem 3D. Ele entra pela capa original do
> grupo, composta na tela e no pack shot.

## Planos

| # | TC | Plano | Ação | Legenda |
|---|---|---|---|---|
| 1 | 0.0–4.5 | Dois personagens, balcão | Tião e Bigode discutem o jogo na TV | A MESA INTEIRA ERRAVA O MESMO PALPITE |
| 2 | 4.5–9.5 | Detalhe do celular no balcão | Bilhete vermelho na tela | DE NOVO NÃO |
| 3 | 9.5–17.5 | Close em Bigode | Bigode conta do grupo | PAREI DE CHUTAR, IRMÃO |
| 4 | 17.5–24.5 | Contra-plano, celular ao centro | Tela do grupo entre os dois | <NOME DO GRUPO> |
| 5 | 24.5–31.5 | Detalhe do chat | Print da análise + green | (prova social) |
| 6 | 31.5–38.5 | Dois personagens, Tião se convence | Tião pega o próprio celular | BOTA O LINK AÍ |
| 7 | 38.5–45.5 | Aberto do bar | Outros clientes se aproximam | AGORA É A MESA INTEIRA |
| 8 | 45.5–53.5 | Close, luz da tela | Notificação; a mesa comemora | (gritaria) |
| 9 | 53.5–58.5 | Pack shot | Capa do grupo + chamada | ENTRA NO GRUPO — LINK NA BIO |

## Prompts de keyframe

**P1 · Dois personagens, balcão**
```
[STYLE_BLOCK], two-shot at the counter of [SET_BUTECO], [CHAR_TIAO] on the left and [CHAR_BIGODE] on the right arguing good-naturedly, two glasses of draft beer between them, the wall TV showing a football match, warm string lights, 9:16
```

**P2 · Detalhe do celular no balcão**
```
[STYLE_BLOCK], macro close-up of a phone on the wooden bar counter showing a settled losing bet slip, beer glass and peanut bowl beside it, warm amber bokeh, 9:16
```

**P3 · Close em Bigode**
```
[STYLE_BLOCK], close-up of [CHAR_BIGODE] at [SET_BUTECO], leaning in with a conspiratorial grin, warm string lights bokeh behind, 9:16
```

**P4 · Contra-plano, celular ao centro**
```
[STYLE_BLOCK], [SET_TELA_GRUPO], the phone held into frame between the two characters at the bar counter, the group header shows [CAPA_GENERICA] as the circular profile photo and the group name, green screen light on both faces, warm bar bokeh behind, 9:16
```

**P5 · Detalhe do chat**
```
[STYLE_BLOCK], macro close-up of a Telegram group chat, a pinned tip message and a green check reaction below it, dark chat theme, timestamps visible, a hand holding the phone over the bar counter, 9:16
```

**P6 · Dois personagens, Tião se convence**
```
[STYLE_BLOCK], two-shot at [SET_BUTECO], [CHAR_TIAO] on the left pulling out his own phone with raised eyebrows, [CHAR_BIGODE] on the right pointing at it and laughing, beer glasses in the foreground, 9:16
```

**P7 · Aberto do bar**
```
[STYLE_BLOCK], wider shot of [SET_BUTECO], both characters at the counter with two other patrons leaning in from the sides to look at the phone, the TV glowing above, warm crowded atmosphere, 9:16
```

**P8 · Close, luz da tela**
```
[STYLE_BLOCK], tight close-up of [CHAR_TIAO] and [CHAR_BIGODE] at [SET_BUTECO], green phone light on their faces, both mouths open mid-shout, arms rising in celebration, blurred patrons behind, 9:16
```

**P9 · Pack shot**
```
[STYLE_BLOCK], dramatic dark green product shot, a smartphone floating at a slight angle showing the [CAPA_GENERICA] group cover and the group name, surrounded by floating footballs, glowing green check marks and coin particles, green light streaks, dark textured green-black background, 9:16
```

## Prompts de animação

| # | Prompt de movimento | Dur |
|---|---|---|
| 1 | `static two-shot, both talk over each other and gesture at the TV, lip sync` | 4s |
| 2 | `macro static, a hand slides the phone away, condensation runs down the beer glass` | 5s |
| 3 | `slow push-in, he leans in and talks with a grin, lip sync` | 8s |
| 4 | `static shot, the phone is raised into frame, both faces catch the green screen light` | 7s |
| 5 | `macro static on the chat, the list scrolls up one notch, the green reaction pops` | 7s |
| 6 | `static two-shot, the left character pulls out his phone, the right one points and laughs, lip sync` | 7s |
| 7 | `slow pull-back, two more patrons lean into frame from the sides, everyone looks at the phone` | 7s |
| 8 | `handheld, a notification slides in, both throw their arms up shouting, beer sloshes, green light flares` | 8s |
| 9 | `the phone rotates slowly in 3D, balls and check marks drift past, green light streaks sweep across` | 5s |

## Conformidade

Rodapé fixo em 100% do tempo: `MINISTÉRIO DA FAZENDA ADVERTE: APOSTA NÃO É
INVESTIMENTO.` + licença SPA/MF da casa parceira + selo 18+ + "jogue com
responsabilidade". Sem green garantido, sem percentual de acerto sem lastro.
