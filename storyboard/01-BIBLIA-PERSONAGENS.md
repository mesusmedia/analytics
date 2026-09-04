# Bíblia de personagens

Estilo global (colar em **todo** prompt de imagem):

> **STYLE_BLOCK** — `stylized 3D animation still, Pixar-like character rendering with
> soft clay/vinyl toy surface, oversized expressive eyes with visible catchlights,
> thick dark eyebrows, subtle skin pores and fabric weave, cinematic shallow depth of
> field, warm practical light sources, photoreal environment textures, vertical 9:16
> composition, no text, no watermark`

Negativo padrão: `cartoon flat, anime, deformed hands, extra fingers, text overlay,
logo, watermark, low detail background, plastic uncanny skin`

---

## LUÍS — estoquista (V1)
> **CHAR_LUIS** — `Brazilian man, 38, medium-light skin, straight dark brown hair
> combed back, thick dark eyebrows, tired droopy eyes, clean shaven, light
> blue-grey button-up work shirt with breast pocket, white plastic ID badge reading
> "LUÍS" clipped to the pocket, silver wristwatch, slim build`

Arco: preocupado → curioso → aliviado → eufórico.

## DEIVID — colega de trabalho (V1)
> **CHAR_DEIVID** — `Brazilian man, 27, brown skin, tall curly black high-top fade
> haircut with shaved sides, thin moustache and soul patch, small gold ear stud,
> very expressive raised eyebrows, grey-blue work polo shirt, ID badge reading
> "DEIVID", energetic posture`

Arco: entusiasmado o tempo todo. É o mensageiro da solução.

## SEU JOÃO — taxista (V2)
> **CHAR_JOAO** — `Brazilian man, 58, tanned weathered skin, thick grey-black
> moustache, short greying hair, heavy eyebrows, wide worried eyes, brown corduroy
> jacket over light blue denim shirt, seatbelt across chest, hands on steering wheel`

Arco: cético → desconfiado → convencido → em casa, tranquilo.

## RICARDO — passageiro executivo (V2)
> **CHAR_RICARDO** — `Brazilian man, 42, olive skin, dark curly hair, salt-and-pepper
> full beard, grey wool blazer over light blue dress shirt, holding a smartphone,
> relaxed confident smile, seated in the back seat`

## SANDRA — esposa (V3)
> **CHAR_SANDRA** — `Brazilian woman, 36, light brown skin, voluminous shoulder-length
> curly brown hair, arched skeptical eyebrows, blue knitted cardigan over floral
> print dress, arms crossed`

## MARCOS — marido (V3)
> **CHAR_MARCOS** — `Brazilian man, 45, light skin, dark wavy hair, thick black
> moustache, stubble, blue denim jacket over light blue shirt, warm hopeful eyes,
> holding a smartphone`

## JEFF — motoboy (V4)
> **CHAR_JEFF** — `Brazilian man, 26, dark brown skin, black open-face motorcycle
> helmet, transparent plastic rain poncho over grey hoodie, thin moustache and goatee,
> curly hair visible under helmet, holding two pizza boxes, rain droplets on face`

## BRENO — cliente (V4)
> **CHAR_BRENO** — `Brazilian man, 32, light brown skin, short dark curly hair, full
> dark beard, plain grey t-shirt, navy gym shorts, barefoot, holding a smartphone,
> broad friendly smile`

## TOBI — cão caramelo (V5)
> **CHAR_TOBI** — `anthropomorphic golden-brown dog character, labrador-retriever
> face, long floppy ears, big brown eyes, human posture, wearing a dark grey
> button-up shirt with rolled sleeves, sitting on a bar stool`

## NEVE — cadela branca (V5)
> **CHAR_NEVE** — `anthropomorphic white samoyed dog character, fluffy pointed ears,
> dark round eyes, soft cream cable-knit sweater, human posture, sitting on a bar stool`

---

## Folha de personagem (gerar 1x por personagem, antes de tudo)

```
[STYLE_BLOCK], character turnaround sheet of [CHAR_XXX],
three views side by side on neutral grey seamless background:
front view, three-quarter view, side profile, full body, T-pose neutral expression,
even soft studio lighting, consistent proportions, model sheet, 16:9
```

Salve como `referencias/char_<nome>.png` e passe como **imagem de referência** em
todos os keyframes daquele personagem.
