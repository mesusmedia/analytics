# V5 — "Buteco dos cães" (68s · 13 planos)

**Gancho (0–3s):** dois cães antropomórficos no balcão do bar.
**Personagens:** TOBI (caramelo), NEVE (branca).
**Sets:** SET_BUTECO, SET_PACKSHOT.
**Arco:** papo de bar → ceticismo → prova na tela → conversão.
**Nota:** é o único com elenco animal. Vale como linha criativa separada — o
formato "bicho falando de aposta" performa como *pattern interrupt* no feed.

| # | TC | Plano | Ação | Legenda |
|---|---|---|---|---|
| 1 | 0.0–3.0 | Dois personagens, balcão | Tobi conta pra Neve | dinheiro com futebol |
| 2 | 3.0–5.4 | Perfil, mais fechado | Tobi fala olhando pra cima | (fala) |
| 3 | 5.4–12.0 | Dois personagens, TV ao fundo | Neve duvida e aponta | se é verdade |
| 4 | 12.0–16.2 | Detalhe do celular | Extrato bancário na tela | (prova) |
| 5 | 16.2–18.4 | Close em Neve | Neve espantada com o celular | nossa isso foi |
| 6 | 18.4–22.3 | Dois personagens, TV | Neve apoia o queixo, interessada | usar esse aplicativo |
| 7 | 22.3–27.4 | Dois personagens, mais fechado | Tobi explica animado | olha esse app |
| 8 | 27.4–30.8 | Dois personagens + celular | Tobi mostra a tela | pra gerar palpites |
| 9 | 30.8–34.6 | Close em Neve | Neve gesticula com a pata | você assistindo futebol |
| 10 | 34.6–39.3 | Detalhe do celular no balcão | App com odd 1.90 | tá jogando |
| 11 | 39.3–53.5 | Aberto do bar | Tobi bebe, os dois conversam | (conclusão) |
| 12 | 53.5–56.5 | Detalhe do app | Tela de palpites, dedo humano | (demo) |
| 13 | 56.5–67.7 | Pack shot | Logo Beto IA + garotos-propaganda | BETO IA |

---

## Prompts de keyframe

**P1 / P3 / P6 / P11 — o dois-personagens mestre**
```
[STYLE_BLOCK], two-shot at the counter of [SET_BUTECO], [CHAR_TOBI] on the left and
[CHAR_NEVE] on the right sitting side by side facing each other, two glasses of draft
beer and a bowl of peanuts on the wooden counter in front of them, the wall TV showing a
football match visible in the upper left, chalkboard menu and neon beer sign behind,
warm string lights, golden cozy light, 9:16
```
> P1 Tobi fala · P3 Neve aponta com a pata · P6 Neve apoia o queixo na pata · P11
> Tobi levanta o copo de chope.

**P2 / P7 / P8**
```
[STYLE_BLOCK], tighter two-shot at [SET_BUTECO], [CHAR_TOBI] on the left in three-quarter
view with an open excited mouth, [CHAR_NEVE] on the right in profile listening, warm
bokeh string lights fill the background, beer glasses in the lower foreground, 9:16
```
> P8: Tobi segura um celular escuro entre os dois, tela virada pra Neve.

**P4**
```
[STYLE_BLOCK], close-up of a smartphone held up at [SET_BUTECO] showing a clean banking
statement screen, [CHAR_TOBI]'s furry paw and snout partially in frame on the right,
beer glass and warm bar bokeh behind, 9:16
```

**P5 / P9**
```
[STYLE_BLOCK], close-up of [CHAR_NEVE] at [SET_BUTECO], fluffy white fur catching the warm
rim light, wide surprised eyes, one paw raised mid-gesture, warm bokeh behind, 9:16
```

**P10 / P12**
```
[STYLE_BLOCK], close-up of a smartphone standing on the bar counter showing a dark
sports-betting app with a highlighted odd value, beer glass on the left, [CHAR_TOBI]
blurred behind on the right, warm amber bar light, green UI accents, 9:16
```

**P13**
```
[SET_PACKSHOT] variant: bold green brand logo lockup filling the upper half, three
smiling brand ambassadors in sports kit below holding a phone, dark green geometric
background, 9:16
```

---

## Prompts de animação

| # | Prompt de movimento | Dur |
|---|---|---|
| 1 | `static two-shot, the dog on the left talks with animated snout movement, the white dog listens, lip sync` | 3s |
| 2 | `slow push-in, the left character talks and tilts his head, ears move slightly` | 3s |
| 3 | `static shot, the white character raises a paw and gestures skeptically while talking, lip sync` | 7s |
| 4 | `macro static on the phone, a thumb scrolls the statement once, slight handheld drift` | 4s |
| 5 | `close-up, the white character's eyes widen, ears perk up, mouth opens in surprise` | 2s |
| 6 | `static two-shot, the white character rests her chin on her paw, both talk, warm lights twinkle` | 4s |
| 7 | `slow push-in, the left character talks excitedly, tail movement implied by body shift` | 5s |
| 8 | `static shot, the phone is raised between them, both characters look at the screen` | 3s |
| 9 | `close-up, the white character gestures with her paw while explaining, lip sync` | 4s |
| 10 | `macro on the phone standing on the counter, the odds value ticks, bar bokeh shimmers` | 5s |
| 11 | `wide static, the left character drinks from the beer glass, both keep talking, TV plays in the background` | 8s (x2) |
| 12 | `macro on the app screen, a finger taps a button, the interface responds` | 3s |
| 13 | `logo settles into place with a green light sweep, the ambassadors hold their pose` | 6s |
