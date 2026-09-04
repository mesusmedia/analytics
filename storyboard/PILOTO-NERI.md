# Piloto — Neri Tipster, do zero ao vídeo pronto

Faça **este** primeiro. Se o resultado agradar, os outros quatro seguem o mesmo
caminho e levam metade do tempo, porque os personagens e os sets já vão existir.

**Tempo real:** ~2h, sendo 1h de fila de renderização (dá pra fazer outra coisa).
**Contas necessárias:** Google AI Studio (grátis) · Kling · Google Flow (Veo) · CapCut (grátis).

---

## Etapa 0 · A divisão dos nove planos

Você tem Kling e Veo. Cada um serve melhor pra uma coisa:

| Plano | Tem fala? | Ferramenta | Por quê |
|---|---|---|---|
| P1 Zezão na obra | murmurado | **Veo** | fala curta, precisa de lip sync |
| P2 Tela do celular | não | **Kling** | só movimento de dedo, mais barato |
| P3 Marão senta e fala | sim, 2 falas | **Veo** | diálogo, o plano mais importante |
| P4 Close do Marão | sim | **Veo** | lip sync fechado |
| P5 Celular entre os dois | sim | **Veo** | fala + revelação |
| P6 Print do chat | não | **Kling** | macro, sem gente |
| P7 Zezão na quitinete | sim | **Veo** | fala curta |
| P8 Reação | sim | **Veo** | a emoção da peça |
| P9 Pack shot | não | **Kling** | objeto girando |

Seis no Veo, três no Kling.

---

## Etapa 1 · Folhas de personagem (15 min)

Vá em **aistudio.google.com** → novo chat → modelo de **imagem** (Nano Banana /
Gemini Image).

Cole isto, exatamente assim, uma vez para cada personagem. **Já está montado —
estilo, personagem e formato no mesmo texto. Não substitua nada.**

**Zezão**
```
Stylized 3D animation still, Pixar-like character rendering with soft clay/vinyl toy
surface, oversized expressive eyes with visible catchlights, thick dark eyebrows,
subtle skin pores and fabric weave. Character turnaround sheet of: Brazilian man, 34,
dark brown skin, shaved head under a faded cap, thin moustache, dusty grey t-shirt
with a torn sleeve, worn jeans, cement dust on his forearms, broad shoulders, tired
but good-humoured face. Three views side by side on neutral grey seamless background:
front view, three-quarter view, side profile, full body, neutral expression, even soft
studio lighting, consistent proportions, model sheet, 16:9. No text, no watermark.
```

**Marão**
```
[mesmo início] ... Character turnaround sheet of: Brazilian man, 45, light brown skin,
thick grey-flecked beard, orange safety helmet, blue work overalls open at the chest
over a white tank top, round belly, loud cheerful expression. [mesmo final]
```

Baixe as duas. Salve como `zezao.png` e `marao.png`. **Essas duas imagens são a
coisa mais importante do processo** — é o que impede o rosto de mudar entre um
plano e outro.

> Se o rosto sair estranho, gere de novo. Não siga adiante com uma folha ruim.

---

## Etapa 2 · Os nove keyframes (25 min)

Ainda no AI Studio. Para cada plano: **anexe a folha do personagem** e cole o
prompt. Os prompts completos estão em `roteiros/01-neri.md`, na seção "Prompts de
keyframe". Anexe:

- P1, P2, P7, P8 → anexe `zezao.png`
- P3, P4, P5 → anexe `zezao.png` **e** `marao.png`
- P6, P9 → nada a anexar (é tela de celular)

Use os arquivos de `prompts/01-neri/` — `P1-keyframe.txt` até `P9-keyframe.txt`.
Já estão montados: estilo, personagem e cenário dentro do mesmo texto, nada a
substituir. Abra, copia tudo, cola.

> Foi exatamente isso que deu errado na primeira tentativa: colar só a descrição
> do personagem, sem o bloco de estilo na frente. Sem ele, o gerador vai pro
> padrão dele, que é foto-realista.

Nos planos P5, P6 e P9 **anexe também a capa do grupo** — o prompt já diz
"the attached Neri Tipster group cover image".

Salve como `p1.png` … `p9.png`.

**Checagem antes de seguir:** ponha as nove lado a lado. É a mesma pessoa em
todas? A camiseta é a mesma? Se não, refaça só as que fugiram, anexando junto o
keyframe anterior como referência extra.

---

## Etapa 3 · As falas (5 min)

| Plano | Quem | Fala |
|---|---|---|
| P1 | Zezão | "Mais um mês que não fecha." |
| P2 | — | (só ambiente) |
| P3 | Marão | "Ô Zezão, senta aqui. Cê ainda tá chutando jogo sozinho?" |
| P3 | Zezão | "Tô. Por quê?" |
| P4 | Marão | "Parei com isso, irmão. Tô no grupo do Neri. Ele manda análise, não chute." |
| P5 | Marão | "Ó, tá aqui. Grupo do Neri. E é de graça." |
| P6 | — | (só ambiente) |
| P7 | Zezão | "Vou entrar só pra dar uma olhada." |
| P8 | Zezão | "Não acredito… deu certinho como ele falou." |
| P9 | locução | "Grupo grátis do Neri. Link na bio." |

---

## Etapa 4 · Os seis planos no Veo (40 min, com fila)

**labs.google/flow** → novo projeto → **Frames to Video** → suba o keyframe.

No prompt, junte o movimento **e** a fala. Formato que funciona:

```
<prompt de movimento do roteiro>. The man speaks in Brazilian Portuguese:
"<fala exata da tabela acima>". Natural lip sync, ambient sound of a construction
site, no music.
```

Exemplo pronto, P3:
```
Handheld two-shot, the right character gestures with the phone while talking, the
left character turns toward him. The older man in the orange helmet speaks in
Brazilian Portuguese: "Ô Zezão, senta aqui. Cê ainda tá chutando jogo sozinho?"
and the other replies "Tô. Por quê?". Natural lip sync, ambient construction site
sound, no music.
```

Gere P1, P3, P4, P5, P7, P8. Baixe cada um.

> Se a boca não bater, gere de novo com a fala mais curta. Fala longa demais é a
> causa nº 1 de lip sync ruim.

---

## Etapa 5 · Os três planos no Kling (20 min, com fila)

**klingai.com** → AI Video → **Image to Video** → suba o keyframe → cole o prompt
de movimento do roteiro (só o movimento, sem fala) → duração 5s.

- P2 → `macro static shot, the thumb scrolls once, the screen glares in the sun, slight handheld drift`
- P6 → `macro static on the chat, the message list scrolls up one notch, the green reaction pops`
- P9 → `the phone rotates slowly in 3D, balls and check marks drift past, green light streaks sweep across`

---

## Etapa 6 · Montagem no CapCut (25 min)

1. Novo projeto **9:16**.
2. Jogue os nove clipes na ordem P1→P9.
3. Corte cada um na duração da tabela do roteiro. Some ~58s.
4. **Legenda automática** → revise → deixe 2 a 4 palavras por cartela.
5. Destaque a palavra-chave de cada cartela em **amarelo-ouro** (é a cor do Neri).
6. Rodapé fixo, sobre os 58 segundos inteiros:
   `MINISTÉRIO DA FAZENDA ADVERTE: APOSTA NÃO É INVESTIMENTO.` + licença SPA/MF +
   selo 18+ + "jogue com responsabilidade".
7. Trilha baixa, -18 dB, sem competir com a fala.
8. Exporte 1080×1920, 30 fps.

---

## Onde as coisas costumam dar errado

**O rosto muda no meio do vídeo.** Você não anexou a folha de personagem em algum
plano. Refaça esse keyframe.

**O clipe parece foto parada.** Faltou elemento vivo no prompt: poeira, ventilador,
chuva, gente ao fundo. Acrescente e gere de novo.

**A boca não acompanha.** Fala longa demais para a duração do plano. Corte a frase.

**Ficou com cara de propaganda.** O gancho está fraco ou demorou. Os 3 primeiros
segundos precisam mostrar o problema, não a marca.

---

## Depois do piloto

Com o Zezão, o Marão e os sets prontos, as outras quatro peças só precisam de:
folhas dos personagens novos, os keyframes e a montagem. O método é idêntico.
