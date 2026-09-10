/**
 * Biblioteca de presets do editor.
 *
 * Cada preset descreve tres camadas independentes:
 *   fundo  - o que aparece atras do video quando ele nao preenche o quadro
 *   video  - como o video e encaixado no quadro
 *   texto  - tipografia e animacao da legenda karaoke
 *   motion - elementos graficos sobrepostos
 *
 * Estilos autorais, escritos do zero. Nenhum asset de terceiro e usado.
 */

window.PRESETS = [
  {
    id: 'karaoke-classico',
    nome: 'Karaokê Clássico',
    familia: 'Universal',
    resumo: 'Branco com destaque amarelo. Funciona em qualquer nicho.',
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
  },
  {
    id: 'impacto-bold',
    nome: 'Impacto Bold',
    familia: 'Hype',
    resumo: 'Caixa alta pesada, destaque verde. Para hook e frase de efeito.',
    fundo: { tipo: 'gradiente', cores: ['#0B0B0F', '#1A1A24'], escurecer: 0 },
    video: { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 },
    texto: {
      fonte: 'Anton', peso: 400, tamanho: 92, entrelinha: 1.05,
      maiuscula: true, espacamento: 1,
      cor: '#FFFFFF', destaque: '#22FF6E', corInativa: '#FFFFFF',
      contorno: '#000000', larguraContorno: 14,
      sombra: { blur: 0, cor: 'rgba(0,0,0,0.9)', y: 8 },
      caixa: null, pilula: null,
      posicao: 0.70, palavrasPorGrupo: 3, animacao: 'pop-forte'
    },
    motion: { barraProgresso: { cor: '#22FF6E', altura: 10, posicao: 'baixo' }, etiqueta: null, emoji: false }
  },
  {
    id: 'caixa-solida',
    nome: 'Caixa Sólida',
    familia: 'Hype',
    resumo: 'Cada palavra dentro de uma caixa preta. Alta legibilidade em fundo claro.',
    fundo: { tipo: 'blur', desfoque: 40, escurecer: 0.2 },
    video: { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 },
    texto: {
      fonte: 'Poppins', peso: 900, tamanho: 70, entrelinha: 1.35,
      maiuscula: false, espacamento: 0,
      cor: '#FFFFFF', destaque: '#FFD400', corInativa: '#FFFFFF',
      contorno: null, larguraContorno: 0,
      sombra: null,
      caixa: { cor: 'rgba(0,0,0,0.88)', raio: 14, padX: 20, padY: 12 },
      pilula: null,
      posicao: 0.72, palavrasPorGrupo: 3, animacao: 'subir'
    },
    motion: { barraProgresso: null, etiqueta: null, emoji: false }
  },
  {
    id: 'neon-glow',
    nome: 'Neon Glow',
    familia: 'Tech',
    resumo: 'Brilho ciano sobre fundo escuro. Nicho de tecnologia e IA.',
    fundo: { tipo: 'gradiente', cores: ['#04060F', '#0A1830'], escurecer: 0 },
    video: { encaixe: 'cover', escala: 0.94, offsetY: -0.04, cantos: 28 },
    texto: {
      fonte: 'Montserrat', peso: 800, tamanho: 74, entrelinha: 1.18,
      maiuscula: true, espacamento: 2,
      cor: '#FFFFFF', destaque: '#00E5FF', corInativa: 'rgba(255,255,255,0.82)',
      contorno: '#02202B', larguraContorno: 6,
      sombra: { blur: 34, cor: '#00E5FF', y: 0 },
      caixa: null, pilula: null,
      posicao: 0.76, palavrasPorGrupo: 3, animacao: 'fade'
    },
    motion: { barraProgresso: { cor: '#00E5FF', altura: 6, posicao: 'baixo' }, etiqueta: null, emoji: false }
  },
  {
    id: 'minimal-limpo',
    nome: 'Minimal Limpo',
    familia: 'Universal',
    resumo: 'Sem efeito, sem cor. Deixa a imagem falar.',
    fundo: { tipo: 'solido', cores: ['#000000'], escurecer: 0 },
    video: { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 },
    texto: {
      fonte: 'Inter', peso: 600, tamanho: 58, entrelinha: 1.3,
      maiuscula: false, espacamento: 0,
      cor: '#FFFFFF', destaque: '#FFFFFF', corInativa: 'rgba(255,255,255,0.55)',
      contorno: '#000000', larguraContorno: 4,
      sombra: { blur: 18, cor: 'rgba(0,0,0,0.5)', y: 4 },
      caixa: null, pilula: null,
      posicao: 0.82, palavrasPorGrupo: 5, animacao: 'fade'
    },
    motion: { barraProgresso: null, etiqueta: null, emoji: false }
  },
  {
    id: 'fogo',
    nome: 'Fogo',
    familia: 'Hype',
    resumo: 'Vermelho quente com tremor no acento. Para virada e tensão.',
    fundo: { tipo: 'gradiente', cores: ['#1A0400', '#3A0A00'], escurecer: 0 },
    video: { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 },
    texto: {
      fonte: 'Anton', peso: 400, tamanho: 88, entrelinha: 1.08,
      maiuscula: true, espacamento: 1,
      cor: '#FFFFFF', destaque: '#FF3B1F', corInativa: '#FFFFFF',
      contorno: '#000000', larguraContorno: 12,
      sombra: { blur: 26, cor: 'rgba(255,59,31,0.55)', y: 0 },
      caixa: null, pilula: null,
      posicao: 0.72, palavrasPorGrupo: 3, animacao: 'tremor'
    },
    motion: { barraProgresso: { cor: '#FF3B1F', altura: 8, posicao: 'baixo' }, etiqueta: null, emoji: false }
  },
  {
    id: 'podcast-pro',
    nome: 'Podcast Pro',
    familia: 'Podcast',
    resumo: 'Vídeo em cartão com moldura e faixa de nome. Corte de entrevista.',
    fundo: { tipo: 'gradiente', cores: ['#101014', '#22222C'], escurecer: 0 },
    video: { encaixe: 'contain', escala: 0.92, offsetY: -0.10, cantos: 32 },
    texto: {
      fonte: 'Inter', peso: 800, tamanho: 64, entrelinha: 1.25,
      maiuscula: false, espacamento: 0,
      cor: '#FFFFFF', destaque: '#FFC53D', corInativa: 'rgba(255,255,255,0.6)',
      contorno: null, larguraContorno: 0,
      sombra: { blur: 20, cor: 'rgba(0,0,0,0.6)', y: 4 },
      caixa: null, pilula: null,
      posicao: 0.78, palavrasPorGrupo: 4, animacao: 'subir'
    },
    motion: {
      barraProgresso: { cor: '#FFC53D', altura: 6, posicao: 'baixo' },
      etiqueta: { texto: '@seuperfil', cor: '#FFFFFF', fundo: 'rgba(0,0,0,0.55)', posicao: 'topo' },
      emoji: false
    }
  },
  {
    id: 'documental',
    nome: 'Documental',
    familia: 'Narrativa',
    resumo: 'Legenda discreta na base com barra fina. Narração e storytelling.',
    fundo: { tipo: 'blur', desfoque: 80, escurecer: 0.5 },
    video: { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 },
    texto: {
      fonte: 'Inter', peso: 500, tamanho: 52, entrelinha: 1.35,
      maiuscula: false, espacamento: 0,
      cor: '#F5F1E8', destaque: '#F5F1E8', corInativa: 'rgba(245,241,232,0.45)',
      contorno: null, larguraContorno: 0,
      sombra: { blur: 24, cor: 'rgba(0,0,0,0.8)', y: 3 },
      caixa: null, pilula: null,
      posicao: 0.86, palavrasPorGrupo: 6, animacao: 'fade'
    },
    motion: { barraProgresso: { cor: 'rgba(245,241,232,0.9)', altura: 3, posicao: 'baixo' }, etiqueta: null, emoji: false }
  },
  {
    id: 'gamer',
    nome: 'Gamer',
    familia: 'Games',
    resumo: 'Magenta elétrico com tremor. Gameplay e reação.',
    fundo: { tipo: 'gradiente', cores: ['#0B0018', '#2A0040'], escurecer: 0 },
    video: { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 },
    texto: {
      fonte: 'Bangers', peso: 400, tamanho: 96, entrelinha: 1.02,
      maiuscula: true, espacamento: 2,
      cor: '#FFFFFF', destaque: '#FF2ECC', corInativa: '#FFFFFF',
      contorno: '#12001F', larguraContorno: 12,
      sombra: { blur: 30, cor: 'rgba(255,46,204,0.6)', y: 0 },
      caixa: null, pilula: null,
      posicao: 0.70, palavrasPorGrupo: 3, animacao: 'tremor'
    },
    motion: { barraProgresso: { cor: '#FF2ECC', altura: 10, posicao: 'baixo' }, etiqueta: null, emoji: false }
  },
  {
    id: 'pilula-pop',
    nome: 'Pílula Pop',
    familia: 'Lifestyle',
    resumo: 'Palavra ativa dentro de uma cápsula colorida. Leve e amigável.',
    fundo: { tipo: 'blur', desfoque: 50, escurecer: 0.25 },
    video: { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 },
    texto: {
      fonte: 'Poppins', peso: 700, tamanho: 66, entrelinha: 1.4,
      maiuscula: false, espacamento: 0,
      cor: '#FFFFFF', destaque: '#0B0B0F', corInativa: '#FFFFFF',
      contorno: '#000000', larguraContorno: 6,
      sombra: null,
      caixa: null,
      pilula: { cor: '#B8FF3C', raio: 999, padX: 24, padY: 10 },
      posicao: 0.76, palavrasPorGrupo: 3, animacao: 'pop'
    },
    motion: { barraProgresso: null, etiqueta: null, emoji: false }
  },
  {
    id: 'uma-palavra',
    nome: 'Uma Palavra',
    familia: 'Hype',
    resumo: 'Uma palavra gigante por vez, no centro. Máxima retenção.',
    fundo: { tipo: 'blur', desfoque: 70, escurecer: 0.4 },
    video: { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 },
    texto: {
      fonte: 'Anton', peso: 400, tamanho: 140, entrelinha: 1,
      maiuscula: true, espacamento: 2,
      cor: '#FFFFFF', destaque: '#FFFFFF', corInativa: '#FFFFFF',
      contorno: '#000000', larguraContorno: 16,
      sombra: { blur: 30, cor: 'rgba(0,0,0,0.7)', y: 8 },
      caixa: null, pilula: null,
      posicao: 0.50, palavrasPorGrupo: 1, animacao: 'pop-forte'
    },
    motion: { barraProgresso: { cor: '#FFFFFF', altura: 6, posicao: 'baixo' }, etiqueta: null, emoji: false }
  },
  {
    id: 'corporativo',
    nome: 'Corporativo',
    familia: 'B2B',
    resumo: 'Azul sóbrio com faixa inferior. Institucional e LinkedIn.',
    fundo: { tipo: 'gradiente', cores: ['#06111F', '#0E2A47'], escurecer: 0 },
    video: { encaixe: 'contain', escala: 0.94, offsetY: -0.08, cantos: 20 },
    texto: {
      fonte: 'Inter', peso: 700, tamanho: 58, entrelinha: 1.3,
      maiuscula: false, espacamento: 0,
      cor: '#FFFFFF', destaque: '#4DA3FF', corInativa: 'rgba(255,255,255,0.65)',
      contorno: null, larguraContorno: 0,
      sombra: { blur: 16, cor: 'rgba(0,0,0,0.55)', y: 3 },
      caixa: null, pilula: null,
      posicao: 0.80, palavrasPorGrupo: 5, animacao: 'subir'
    },
    motion: {
      barraProgresso: { cor: '#4DA3FF', altura: 6, posicao: 'baixo' },
      etiqueta: { texto: 'sua marca', cor: '#FFFFFF', fundo: 'rgba(13,42,71,0.85)', posicao: 'topo' },
      emoji: false
    }
  }
];

window.FORMATOS = [
  { id: '9:16', nome: 'Vertical 9:16', largura: 1080, altura: 1920 },
  { id: '4:5',  nome: 'Feed 4:5',      largura: 1080, altura: 1350 },
  { id: '1:1',  nome: 'Quadrado 1:1',  largura: 1080, altura: 1080 },
  { id: '16:9', nome: 'Horizontal 16:9', largura: 1920, altura: 1080 }
];
