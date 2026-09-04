# TEMPLATE — historinha de tipster (50–65s · 9 planos)

Molde derivado dos 5 filmes de referência, com a solução trocada: **não é o app,
é o grupo do tipster**. Duplique este arquivo por tipster, troque os slots
`<...>` e o bloco `CHAR_TIPSTER`.

**Slots a preencher:** `<TIPSTER>` `<GRUPO>` `<PROTAGONISTA>` `<SET_A>` `<SET_B>` `<CTA>`

---

## O que muda em relação aos filmes do app

| | Filmes do app | Historinha de tipster |
|---|---|---|
| Solução | ferramenta que gera palpite | **pessoa** que manda o palpite no grupo |
| Prova | tela do app, odd, saldo | **print do grupo**: mensagem do tipster + green |
| Revelação | luz verde do app no rosto | luz da tela do chat, mesma assinatura verde |
| Terceiro personagem | não existe | o tipster aparece **na tela**, nunca no mesmo ambiente |
| CTA | baixar / testar | **entrar no grupo** |

> O tipster nunca contracena fisicamente com o protagonista. Ele existe em print,
> áudio e vídeo dentro do celular. Isso mantém a produção barata e é como o
> público realmente conhece o tipster.

---

## Estrutura de planos

| # | TC | Plano | Ação | Legenda |
|---|---|---|---|---|
| 1 | 0.0–4.0 | Médio, `<SET_A>` | `<PROTAGONISTA>` no aperto que abre a história | `<GANCHO EM CAIXA ALTA>` |
| 2 | 4.0–9.0 | Detalhe da tela | O número que dói: saldo, conta, mensagem | (prova do problema) |
| 3 | 9.0–17.0 | Dois personagens | Um amigo cita o grupo do `<TIPSTER>` | `<fala coloquial>` |
| 4 | 17.0–24.0 | Close no amigo | Ele explica quem é o tipster e o que ele manda | `<fala>` |
| 5 | 24.0–31.0 | Contra-plano, celular ao centro | Tela do grupo: foto de capa, nome, mensagens | `<nome do grupo>` |
| 6 | 31.0–38.0 | Detalhe do chat | Print da entrada + o green marcado | (prova social) |
| 7 | 38.0–45.0 | Médio, `<SET_B>` | Protagonista sozinho entra no grupo | `<fala>` |
| 8 | 45.0–53.0 | Close, luz do chat | Chega a notificação; reação | (euforia) |
| 9 | 53.0–58.0 | Pack shot | Capa do grupo + chamada | `<CTA>` |

---

## Prompts de keyframe

**P1**
```
[STYLE_BLOCK], [CHAR_<PROTAGONISTA>] in [<SET_A>], medium shot, <ação física>,
<expressão em termos físicos>, <fonte e direção da luz>, 9:16
```

**P3**
```
[STYLE_BLOCK], two-shot in [<SET_A>], [CHAR_AMIGO] on the right holding up a
smartphone with an excited open-mouth smile, [CHAR_<PROTAGONISTA>] on the left
leaning in with raised eyebrows, <detalhe do set em primeiro plano>,
<luz do set>, 9:16
```

**P5 — a revelação do grupo**
```
[STYLE_BLOCK], [SET_TELA_GRUPO], the phone held into frame between two characters,
the group chat header shows a circular profile photo and the group name, message
bubbles below, strong green screen light on both faces, <set> blurred behind, 9:16
```

**P6 — o print**
```
[STYLE_BLOCK], macro close-up of the phone screen, a messaging group chat with a
pinned tip message and a green check reaction below it, dark chat theme,
timestamps visible, the hand holding the phone in soft focus, 9:16
```

**P8**
```
[STYLE_BLOCK], close-up of [CHAR_<PROTAGONISTA>] in [<SET_B>], the phone screen
light on his face, a notification banner reflected in his eyes, mouth opening in
disbelief turning to joy, dark room around him, 9:16
```

**P9 — pack shot do grupo**
```
[STYLE_BLOCK], dramatic dark green product shot, a smartphone floating at a slight
angle showing the group cover image and the group name, surrounded by floating
footballs, glowing green check marks and coin particles, green light streaks, dark
textured green-black background, 9:16
```

---

## Prompts de animação

| # | Prompt de movimento | Dur |
|---|---|---|
| 1 | `slow push-in, <ação>, <elemento ambiente vivo>` | 4s |
| 2 | `macro static shot, thumb scrolls once on the screen, slight handheld drift` | 5s |
| 3 | `handheld two-shot, the right character gestures with the phone while talking, the left character leans in surprised, lip sync` | 8s |
| 4 | `slow push-in on the close-up, he talks animatedly, natural head movement, lip sync` | 7s |
| 5 | `static shot, the phone is raised into frame, both faces catch the green screen light` | 7s |
| 6 | `macro static on the chat, the message list scrolls up one notch, the green reaction pops` | 7s |
| 7 | `slow push-in, the character taps the join button, the screen light brightens on his face` | 7s |
| 8 | `handheld, a notification slides in, his eyes widen and he sits up, green light flares` | 8s |
| 9 | `the phone rotates slowly in 3D, footballs and check marks drift past, green light streaks sweep across` | 5s |

---

## Conformidade

Rodapé fixo em 100% do tempo:
`MINISTÉRIO DA FAZENDA ADVERTE: APOSTA NÃO É INVESTIMENTO.` + licença SPA/MF da
casa parceira + selo 18+ + "jogue com responsabilidade".

Grupo de tipster tem uma linha extra de cuidado: **não prometer green garantido,
não citar percentual de acerto sem lastro, não usar "renda extra garantida"**.
Fale em análise e disciplina, nunca em certeza.
