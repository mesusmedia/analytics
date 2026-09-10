# Editor de Vídeo

Editor de cortes verticais que roda no navegador. Carrega um vídeo, sincroniza a
legenda palavra a palavra, aplica um preset visual e exporta o arquivo pronto
para Reels, Shorts e TikTok.

Nada sobe para servidor: o vídeo é lido do disco, desenhado num `<canvas>` e
gravado localmente pelo `MediaRecorder`.

## Como abrir

```bash
cd editor-video
python3 -m http.server 8080
# abra http://localhost:8080
```

Abrir o `index.html` direto pelo `file://` também funciona no Chrome. O servidor
local é preferível porque garante o carregamento das fontes.

## Fluxo de trabalho

1. **Vídeo** — escolha o arquivo na coluna da direita.
2. **Legenda** — cole a fala, ou importe um `.srt`, `.vtt` ou JSON de palavras.
   Texto colado é distribuído pela duração do vídeo com peso por tamanho de
   palavra, então palavras longas ficam mais tempo na tela.
3. **Preset** — clique em um dos doze na coluna da esquerda.
4. **Ajuste fino** — tamanho, altura, palavras por bloco, cores e etiqueta.
5. **Exportar** — grava em tempo real e baixa um `.webm`.

## Os doze presets

| Preset | Família | Marca visual |
| --- | --- | --- |
| Karaokê Clássico | Universal | Branco, destaque amarelo, contorno preto |
| Impacto Bold | Hype | Caixa alta pesada, destaque verde, barra de progresso |
| Caixa Sólida | Hype | Cada palavra numa caixa preta |
| Neon Glow | Tech | Brilho ciano, cantos arredondados |
| Minimal Limpo | Universal | Sem efeito, palavra ativa em contraste |
| Fogo | Hype | Vermelho quente com tremor na entrada |
| Podcast Pro | Podcast | Vídeo em cartão, faixa de nome no topo |
| Documental | Narrativa | Legenda discreta na base, barra fina |
| Gamer | Games | Magenta elétrico com tremor |
| Pílula Pop | Lifestyle | Palavra ativa dentro de uma cápsula |
| Uma Palavra | Hype | Uma palavra gigante por vez, centralizada |
| Corporativo | B2B | Azul sóbrio, moldura e etiqueta de marca |

Formatos de saída: 9:16, 4:5, 1:1 e 16:9.

## Estrutura

| Arquivo | Responsabilidade |
| --- | --- |
| `src/presets.js` | Os doze presets e os formatos de saída |
| `src/legenda.js` | Importação de SRT, VTT, JSON e texto; agrupamento karaokê |
| `src/render.js` | Desenho do quadro: fundo, vídeo, motion e legenda |
| `src/app.js` | Estado, interface, transporte e exportação |
| `index.html` | Marcação e estilos da interface |

## Como criar um preset novo

Copie um objeto de `src/presets.js` e mude o que interessa. As três camadas são
independentes:

```js
{
  id: 'meu-preset',
  nome: 'Meu Preset',
  familia: 'Universal',
  resumo: 'Uma linha sobre quando usar.',
  fundo: { tipo: 'blur', desfoque: 60, escurecer: 0.35 },
  video: { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 },
  texto: {
    fonte: 'Montserrat', peso: 900, tamanho: 78, entrelinha: 1.12,
    maiuscula: true, espacamento: 0,
    cor: '#FFFFFF', destaque: '#FFE600', corInativa: '#FFFFFF',
    contorno: '#000000', larguraContorno: 10,
    sombra: { blur: 12, cor: 'rgba(0,0,0,0.65)', y: 6 },
    caixa: null, pilula: null,
    posicao: 0.74, palavrasPorGrupo: 3, animacao: 'pop'
  },
  motion: { barraProgresso: null, etiqueta: null, emoji: false }
}
```

- `fundo.tipo`: `blur`, `gradiente` ou `solido`
- `video.encaixe`: `cover` preenche o quadro, `contain` cabe inteiro dentro dele
- `texto.animacao`: `pop`, `pop-forte`, `subir`, `fade`, `tremor`, `nenhuma`
- `texto.posicao`: 0 é o topo do quadro, 1 é a base
- `caixa` desenha um retângulo atrás de toda palavra; `pilula`, só atrás da ativa

Os tamanhos são escritos para 1080 de largura e o renderizador reescala sozinho
para os outros formatos.

## Limites conhecidos

- A saída é WebM. As três plataformas aceitam, mas se precisar de MP4 converta
  depois com ffmpeg.
- A gravação é em tempo real: um corte de 60 s leva 60 s para exportar.
- Não há transcrição automática. A legenda vem de texto colado ou de um SRT.
- Testado no Chrome. O Safari não implementa parte da API de gravação usada aqui.
