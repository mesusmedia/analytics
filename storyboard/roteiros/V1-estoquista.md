# V1 — "Ele tava perto de ser demitido" (64s · 11 planos)

**Gancho (0–2s):** cartela preta + saldo de R$ 299,99.
**Personagens:** LUÍS, DEIVID.
**Sets:** SET_ESTOQUE, SET_COPA, SET_ONIBUS, SET_PACKSHOT.
**Arco:** aperto financeiro → indicação do colega → teste no ônibus → alívio.

| # | TC | Plano | Ação | Legenda |
|---|---|---|---|---|
| 1 | 0.0–2.3 | Médio, por cima do ombro | Luís olha o celular no estoque | ELE TAVA PERTO DE SER DEMITIDO |
| 2 | 2.3–7.4 | Detalhe do celular | Saldo: R$ 299,99 | SÓ ISSO |
| 3 | 7.4–14.7 | Médio no corredor | Chefe passa atrás, Luís se encolhe | (tensão) |
| 4 | 14.7–22.0 | Dois personagens, copa | Deivid chega animado com o celular | JOGO QUE BATEU |
| 5 | 22.0–29.4 | Close em Deivid | Deivid explica a IA | CINQUENTA SITES E... |
| 6 | 29.4–36.7 | Contra-plano, celular no centro | Deivid mostra a tela pro Luís | BETO IA |
| 7 | 36.7–39.7 | Plano aberto, ponto de ônibus | Luís sozinho na chuva decide testar | DEVIA TESTAR |
| 8 | 39.7–45.3 | Médio no ônibus | Luís de pé, celular verde na mão | PRONTO IREI ANALISAR |
| 9 | 45.3–52.6 | Close, luz do celular | Luís lê o palpite | (silêncio) |
| 10 | 52.6–59.4 | Close, reação | Luís explode de alegria, Pix na tela | (euforia) |
| 11 | 59.4–63.9 | Pack shot | App + CTA | TESTE AGORA |

---

## Prompts de keyframe

**P1**
```
[STYLE_BLOCK], [CHAR_LUIS] in [SET_ESTOQUE], over-the-shoulder medium shot from behind
his head, he looks down at a smartphone held in his hand, worried tired expression,
cool fluorescent light, phone screen glowing softly on his face, 9:16
```

**P2**
```
[STYLE_BLOCK], extreme close-up of a hand holding a smartphone showing a clean blue
banking app with a low balance, shallow depth of field, [SET_ESTOQUE] blurred behind,
cool blue light, 9:16
```

**P3**
```
[STYLE_BLOCK], [CHAR_LUIS] standing in [SET_ESTOQUE] holding a clipboard, a stern older
supervisor in a dark navy shirt walks past behind him out of focus, Luís avoids eye
contact, anxious micro-expression, deep aisle perspective, 9:16
```

**P4**
```
[STYLE_BLOCK], two-shot in [SET_COPA], [CHAR_DEIVID] on the right holding up a
smartphone with an excited open-mouth smile, [CHAR_LUIS] on the left leaning in with
raised eyebrows and a surprised expression, coffee pot and mugs on the counter in
foreground, warm tungsten light, 9:16
```

**P5**
```
[STYLE_BLOCK], close-up of [CHAR_DEIVID] in [SET_COPA], mid-speech, wide enthusiastic
eyes looking off-camera left, warm rim light on his hair, coffee pot bokeh behind, 9:16
```

**P6**
```
[STYLE_BLOCK], reverse angle in [SET_COPA], [CHAR_LUIS] on the left in profile looking
at a smartphone held into frame from the right, the screen fills the centre of the
composition showing a green sports-betting tips list, green light on both faces, 9:16
```

**P7**
```
[STYLE_BLOCK], wide shot, [CHAR_LUIS] standing at a night bus stop in the rain among
other people holding umbrellas, he looks down at his phone, orange street lamp
overhead, wet reflective pavement, cold blue night palette, 9:16
```

**P8**
```
[STYLE_BLOCK], [CHAR_LUIS] in [SET_ONIBUS], medium shot, standing and holding a yellow
overhead grab handle with his right hand, his left hand holds a phone radiating strong
green light onto his face and chest, blurred passengers behind, 9:16
```

**P9**
```
[STYLE_BLOCK], close-up of [CHAR_LUIS] in [SET_ONIBUS], reading the phone screen with
concentrated hopeful eyes, cool blue-white screen light on his face, rain bokeh
through the window behind, 9:16
```

**P10**
```
[STYLE_BLOCK], close-up of [CHAR_LUIS] in [SET_ONIBUS], eyes wide open in pure joy,
mouth open in a laugh, holding the phone up showing a green money-transfer confirmation
screen, strong green glow on his face, 9:16
```

**P11**
```
[STYLE_BLOCK], [SET_PACKSHOT], smartphone showing the app home screen, bold white
headline space at the top of the frame, 9:16
```

---

## Prompts de animação (image-to-video, a partir de cada keyframe)

| # | Prompt de movimento | Dur |
|---|---|---|
| 1 | `slow push-in on the character, he exhales and his shoulders drop, subtle phone screen flicker` | 3s |
| 2 | `macro static shot, thumb scrolls once on the screen, slight handheld drift` | 5s |
| 3 | `camera slowly dollies down the aisle, the supervisor walks past in the background, the character shifts uncomfortably` | 6s |
| 4 | `handheld two-shot, the right character gestures excitedly with the phone while talking, the left character leans in surprised` | 6s |
| 5 | `slow push-in on the close-up, character talks animatedly, natural head movement, lip sync` | 6s |
| 6 | `static shot, the phone is raised into frame, the left character's eyes widen and track the screen` | 6s |
| 7 | `slow static wide, rain falls continuously, the character raises his phone and hesitates` | 3s |
| 8 | `subtle bus sway, the character steadies himself with the grab handle, green screen light pulses on his face` | 6s |
| 9 | `slow push-in, the character's eyes scan the screen left to right, expression shifts from doubt to hope` | 6s |
| 10 | `handheld, the character bursts into a laugh and raises the phone, a small celebratory head tilt, green light flares` | 6s |
| 11 | `the phone rotates slowly in 3D, footballs and check marks drift past, green light streaks sweep across` | 5s |
