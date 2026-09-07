# Pipeline — do roteiro ao mp4

## Uma vez, no PC

```bash
git clone https://github.com/mesusmedia/analytics
cd analytics/video
npm install
cp .env.example .env      # cole a chave do Google AI Studio no .env
npm run modelos           # confere o que a sua chave libera
```

`npm run modelos` imprime os IDs reais de imagem e vídeo da **sua** conta. Fixe os
escolhidos no `.env` como `MODELO_IMAGEM` e `MODELO_VIDEO`. Sem eles, os scripts
pegam o primeiro compatível — funciona, mas muda se o Google mexer no catálogo.

## Peça nova

```bash
npm run peca 01-neri
```

Encadeia tudo e para na primeira etapa que falhar:

| Etapa | O que faz | Custa crédito |
|---|---|---|
| `prompts` | expande `[STYLE_BLOCK]`, `[CHAR_*]`, `[SET_*]`, `[CAPA_*]` | não |
| `keyframes` | 9 imagens em `public/keyframes/<slug>/` | **sim** |
| `clipes` | 9 vídeos em `public/clipes/<slug>/` | **sim, caro** |
| `vinculo` | preenche `clipe` em `dados/<slug>.json` | não |
| `render` | `out/<slug>.mp4` | não |

## Pare no meio pra conferir

Clipe é a etapa cara. Nunca gere clipe em cima de keyframe que você não olhou:

```bash
npm run peca 01-neri --ate keyframes
# abra public/keyframes/01-neri/ e confira rosto, roupa, cenário
npm run keyframes 01-neri --plano 5 --forcar   # refaz só o que saiu ruim
npm run peca 01-neri                            # segue do ponto certo
```

Toda etapa pula o que já existe. Rodar de novo não regera nem recobra.

## Consistência de personagem

Antes da primeira peça, gere as folhas de personagem uma vez e salve em
`storyboard/referencias/chars/char_<nome>.png`. O gerador de keyframe manda essas
imagens como referência em toda chamada. Sem elas o personagem muda de rosto
entre um plano e outro — é o erro mais caro do fluxo.

Os prompts das folhas saem em `storyboard/prompts/<slug>/FOLHA-*.txt`.

## Variação de gancho

```bash
cp dados/01-neri.json dados/01-neri-v2.json    # troque gancho e legendas
npx remotion render Historinha out/neri-v2.mp4 --props=dados/01-neri-v2.json
```

Mesmos clipes, JSON diferente. Variação de gancho não regera vídeo — só re-renderiza.

## No Maestri

```
maestri note create --name "Status: peça <slug>" "- [ ] roteiro
- [ ] prompts
- [ ] keyframes conferidos
- [ ] clipes
- [ ] render"

maestri recruit "Produtor" --preset "<preset>" --role "<papel>"
maestri connect "Produtor"
maestri ask "Produtor" "Rode 'npm run peca <slug> --ate keyframes' em analytics/video.
Abra os 9 keyframes, compare com storyboard/prompts/<slug>/FOLHA-*.txt e me diga
quais planos precisam refazer antes de gastar clipe. Marque a nota a cada etapa."
```

Rode `maestri preset list` e `maestri role list` antes, pra usar os nomes certos.

O terminal recrutado precisa do `.env` com a chave — ele roda no seu PC, no mesmo
checkout. A chave nunca entra em prompt, nota ou commit.

## O que ainda é seu

- escrever o roteiro (agentes `roteirista-ugc` e `diretor-storyboard`)
- preencher a ficha do tipster em `storyboard/03-TIPSTERS.md` lendo a capa
- olhar os keyframes antes de liberar clipe
- conferir lip sync em pt-BR nos planos com fala (P3 e P5 no Neri)
