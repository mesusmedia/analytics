# V2 — "Ele não acreditava em si mesmo" (82s · 15 planos)

**Gancho (0–11s):** cartela fixa sobre o diálogo dentro do táxi.
**Personagens:** SEU JOÃO (taxista), RICARDO (passageiro).
**Sets:** SET_TAXI, SET_SALA_ANTIGA, SET_PACKSHOT.
**Arco:** corrida à noite → passageiro indica o app → taxista testa em casa.

| # | TC | Plano | Ação | Legenda |
|---|---|---|---|---|
| 1 | 0.0–1.6 | Dois personagens, de dentro do carro | João dirige, Ricardo atrás | vamo mais uma... |
| 2 | 1.6–3.0 | Close João | João desconfia | o que? |
| 3 | 3.0–8.4 | Close Ricardo | Ricardo explica | inteligência artificial |
| 4 | 8.4–11.3 | Close João | João não entende | tá falando de |
| 5 | 11.3–18.5 | Frontal pelo capô | Táxi rodando na Copacabana | os palpites já |
| 6 | 18.5–21.0 | Close João | João pergunta | você usa esse |
| 7 | 21.0–25.6 | Close Ricardo | Ricardo confirma | palpites e 18 |
| 8 | 25.6–32.4 | Frontal pelo capô, aberto | Táxi parado, neon ao fundo | 50 100 reais |
| 9 | 32.4–36.0 | Close Ricardo | Ricardo detalha o app | o app se |
| 10 | 36.0–40.1 | Close João | João processando | (silêncio) |
| 11 | 40.1–47.4 | Frontal pelo capô | Ricardo insiste | isso por você |
| 12 | 47.4–68.0 | Médio na sala | João em casa testa | eu não preciso |
| 13 | 68.0–72.1 | Close João, luz verde | Reação | até eu saber |
| 14 | 72.1–76.6 | Aberto da sala | João sentado na poltrona | vai poder observar |
| 15 | 76.6–82.2 | Pack shot | App + CTA | BETO IA |

---

## Prompts de keyframe

**P1 / P5 / P8 / P11 — o plano recorrente do táxi**
```
[STYLE_BLOCK], [SET_TAXI], frontal shot through the windshield from the car hood,
[CHAR_JOAO] driving on the left with both hands on the wheel and a worried sideways
glance, [CHAR_RICARDO] visible in the back seat on the right holding a glowing phone
and gesturing, rain droplets on the windshield, neon storefront signs and a Brazilian
flag behind the car, wet street reflections, 9:16
```
> Variação P5: táxi em movimento, rastros de luz nas laterais.
> Variação P8: táxi parado, letreiro "TAXI" no teto visível, palmeiras.
> Variação P11: Ricardo com a mão aberta em gesto de explicação.

**P2 / P4 / P6 / P10 — closes do taxista**
```
[STYLE_BLOCK], tight close-up of [CHAR_JOAO] inside [SET_TAXI], seen from the passenger
side, wide worried eyes glancing to his right, moustache, city bokeh through the rear
window behind him, warm dashboard light on his face, 9:16
```
> P2 sobrancelha erguida · P4 boca entreaberta · P6 perguntando · P10 pensativo.

**P3 / P7 / P9 — closes do passageiro**
```
[STYLE_BLOCK], close-up of [CHAR_RICARDO] in the back seat of [SET_TAXI], holding a
smartphone at chest height, confident half-smile, talking, blue and orange street bokeh
through the rear windshield, 9:16
```

**P12**
```
[STYLE_BLOCK], [CHAR_JOAO] in [SET_SALA_ANTIGA], medium shot, seated forward on the
armchair holding a smartphone that casts a strong green glow across his face and chest,
surprised open mouth, warm lamps in the background contrast with the green light, 9:16
```

**P13**
```
[STYLE_BLOCK], close-up of [CHAR_JOAO] in [SET_SALA_ANTIGA], green phone light from
below on his face, eyebrows raised in disbelief turning into a smile, 9:16
```

**P14**
```
[STYLE_BLOCK], wide shot of [SET_SALA_ANTIGA], [CHAR_JOAO] sunk into the armchair in the
centre holding the phone, the whole room warm and dim around him, coffee mug and open
book on the low table in the foreground, 9:16
```

**P15**
```
[STYLE_BLOCK], [SET_PACKSHOT], 9:16
```

---

## Prompts de animação

| # | Prompt de movimento | Dur |
|---|---|---|
| 1 | `static hood-mounted shot, the car moves forward, rain on the windshield, both characters talk` | 2s |
| 2 | `slow push-in on the driver, he glances to his right and frowns, lip sync` | 2s |
| 3 | `slow push-in on the passenger, he speaks and gestures with the phone, lip sync` | 6s |
| 4 | `static close-up, the driver's eyes flick between the road and the mirror, lip sync` | 3s |
| 5 | `hood-mounted shot, the car drives forward, city lights streak past on both sides, wipers move once` | 7s |
| 6 | `static close-up, driver asks a question, small head turn, lip sync` | 3s |
| 7 | `close-up, passenger nods confidently while talking, phone screen glows, lip sync` | 5s |
| 8 | `hood-mounted shot, the taxi is stopped at a light, neon signs flicker, both characters talk` | 7s |
| 9 | `close-up, passenger explains, subtle handheld drift, lip sync` | 4s |
| 10 | `close-up of the driver, he processes silently, a slow blink, eyes soften` | 4s |
| 11 | `hood-mounted shot, the passenger leans forward between the seats and gestures` | 7s |
| 12 | `slow push-in, the character scrolls the phone, green light pulses across his face, his expression shifts to amazement` | 8s |
| 13 | `tight close-up, his eyebrows rise and a smile spreads, green light flickers` | 4s |
| 14 | `slow pull-back wide shot, the character settles into the armchair, lamps flicker warmly` | 5s |
| 15 | `the phone rotates in 3D, footballs and green check marks orbit past, light streaks sweep` | 6s |
