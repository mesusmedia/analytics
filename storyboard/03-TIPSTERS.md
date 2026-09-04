# Fichas de tipster

Cada tipster vira **um personagem 3D** derivado da foto de capa do grupo, e ganha
**uma historinha própria** de 45–70s. A ficha abaixo é o que trava a consistência.

## Ficha modelo — copie e preencha por tipster

```
TIPSTER: <nome / @ do grupo>
CAPA:    referencias/capas/<slug>.jpg
GRUPO:   Telegram | WhatsApp   ·   Grátis | VIP
NICHO:   futebol / basquete / múltiplas / cantos / escanteios…
TOM:     tranquilo e didático | acelerado e gritado | analítico e frio
CTA:     "entra no grupo pelo link da bio" / "@<handle>"
```

### Bloco travado do personagem (derivar da capa)

Preencha lendo a capa, **não** invente. Estes são os campos que precisam sair da
imagem, porque são os que o gerador esquece entre um plano e outro:

```
CHAR_<NOME> — `Brazilian man/woman, <idade aparente>, <tom de pele>,
<cabelo: comprimento, cor, corte>, <barba/sem barba>, <óculos?>,
<boné/touca? cor e marca>, <camiseta/jaqueta: cor, gola, estampa>,
<acessórios: corrente, relógio, brinco>, <porte físico>, <expressão típica>`
```

> Regra: se está na capa, entra no bloco. Boné, corrente e logo do grupo são o que
> o público reconhece — perder isso quebra o vínculo com a marca do tipster.

### Cenário do tipster

O tipster não aparece no mundo do protagonista. Ele aparece **na tela**: no grupo,
em print, em áudio, em vídeo curto. Dois sets padrão:

```
SET_TELA_GRUPO — `close-up of a smartphone screen showing a messaging group chat
interface, dark theme, a pinned group header with a profile photo, a stack of
message bubbles with a green tick reaction, timestamps, the phone held in a hand,
shallow depth of field, screen light on the fingers`

SET_ESTUDIO_TIPSTER — `small home studio at night, ring light off to one side,
a wall with a football club scarf and a monitor showing live odds, the tipster
seated talking to camera, warm key light with a cool blue rim`
```

---

## Fichas preenchidas

> As capas ficam em `referencias/capas/<slug>.jpg`. Elas **não** são redesenhadas:
> entram compostas na tela do grupo e no pack shot, como `[CAPA_<NOME>]`.

### 1. NERI — `Neri Tipster`
```
GRUPO:   Telegram · Grátis · 67.215 inscritos
NICHO:   basquete e futebol
BIO:     "O melhor e mais assertivo grupo de Basquete e Futebol do Brasil"
PALETA:  preto + amarelo-ouro
CAPA:    homem de braços cruzados, boné escuro, barba cheia, camiseta preta,
         bola de basquete atrás, selo amarelo "GRUPO GRÁTIS", fundo preto
TOM:     firme e direto, tom de quem já provou serviço
CTA:     "entra no grupo grátis do Neri"
```
> `[CAPA_NERI]` = a foto de capa original, composta na tela e no pack shot.
> Assinatura de cor da peça: o **amarelo-ouro** do selo entra na legenda karaokê.

### 2. IGOR SÁ — `IGORSATIPS GRÁTIS`
```
GRUPO:   Telegram · Grátis · 25.726 inscritos
NICHO:   basquete e futebol
PALETA:  coral-vermelho + branco + azul de marina
CAPA:    homem de camiseta branca larga ajustando o óculos escuro, de perfil,
         marina com barcos e prédios ao fundo, dia claro, selo vermelho
         "GRUPO GRÁTIS", logo hexagonal "IGOR SÁ"
TOM:     leve e confiante, clima de dia bom
CTA:     "entra no IgorSaTips grátis"
```
> `[CAPA_IGOR]`. A peça dele é a única com **luz de dia** — combina com a capa.

### 3. THIERRY — `THIERRY`
```
GRUPO:   Telegram · Grátis · 142.294 inscritos
NICHO:   futebol
PALETA:  verde neon + preto
CAPA:    homem sorrindo com os dois punhos cerrados em comemoração, camiseta
         preta "THIERRY GRUPO GRÁTIS", fundo de estádio em verde neon com seta
TOM:     comemorativo, energia de arquibancada
CTA:     "entra no grupo grátis do Thierry"
```
> `[CAPA_THIERRY]`. O verde neon dela **é** o verde da revelação — nessa peça a
> assinatura de luz e a marca são a mesma cor.

### 4 e 5. Genéricos
Duas peças sem tipster nomeado, para trocar a capa e o nome na montagem:
`[CAPA_GENERICA]` e `<GRUPO>`. Servem para testar gancho novo sem queimar o nome
de ninguém, e para reaproveitar quando entrar um tipster novo.
