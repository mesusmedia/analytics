/**
 * Motor de legenda karaoke.
 * Modelo unico: uma lista de palavras com inicio e duracao em segundos.
 *   palavra = { t: inicio, d: duracao, w: texto }
 * Tudo o mais (SRT, texto colado, JSON) e convertido para esse formato.
 */

const Legenda = (() => {

  /** Divide texto livre em palavras distribuidas por peso de tamanho. */
  function deTexto(texto, inicio, fim) {
    const brutas = texto.split(/\s+/).filter(Boolean);
    if (!brutas.length) return [];
    const total = Math.max(0.1, fim - inicio);
    const pesos = brutas.map(p => Math.max(2, p.replace(/[^\wÀ-ÿ]/g, '').length));
    const soma = pesos.reduce((a, b) => a + b, 0);
    let t = inicio;
    return brutas.map((w, i) => {
      const d = (pesos[i] / soma) * total;
      const item = { t: +t.toFixed(3), d: +d.toFixed(3), w };
      t += d;
      return item;
    });
  }

  function tempoSrt(str) {
    const m = str.trim().match(/(\d+):(\d+):(\d+)[,.](\d+)/);
    if (!m) return null;
    return (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]) + (+m[4]) / 1000;
  }

  /** Converte SRT ou VTT em palavras, distribuindo dentro de cada bloco. */
  function deSrt(conteudo) {
    const blocos = conteudo.replace(/\r/g, '').replace(/^WEBVTT.*\n/, '').split(/\n{2,}/);
    const palavras = [];
    for (const bloco of blocos) {
      const linhas = bloco.split('\n').filter(l => l.trim());
      if (!linhas.length) continue;
      const iTempo = linhas.findIndex(l => l.includes('-->'));
      if (iTempo < 0) continue;
      const [a, b] = linhas[iTempo].split('-->');
      const ini = tempoSrt(a), fim = tempoSrt(b);
      if (ini === null || fim === null) continue;
      const texto = linhas.slice(iTempo + 1).join(' ').replace(/<[^>]+>/g, '');
      palavras.push(...deTexto(texto, ini, fim));
    }
    return palavras;
  }

  /** Aceita SRT, VTT, JSON de palavras ou texto puro. */
  function importar(conteudo, duracao) {
    const limpo = conteudo.trim();
    if (!limpo) return [];
    if (limpo.startsWith('[') || limpo.startsWith('{')) {
      try {
        const dado = JSON.parse(limpo);
        const lista = Array.isArray(dado) ? dado : (dado.palavras || dado.words || []);
        return lista.map(p => ({
          t: +(p.t ?? p.start ?? p.inicio ?? 0),
          d: +(p.d ?? p.duration ?? (p.end != null ? p.end - (p.start ?? 0) : 0.3)),
          w: String(p.w ?? p.word ?? p.texto ?? '')
        })).filter(p => p.w);
      } catch (e) { /* cai para os outros formatos */ }
    }
    if (limpo.includes('-->')) return deSrt(limpo);
    return deTexto(limpo, 0, duracao || 15);
  }

  /** Agrupa palavras em blocos exibidos juntos na tela. */
  function agrupar(palavras, porGrupo) {
    const grupos = [];
    for (let i = 0; i < palavras.length; i += porGrupo) {
      const fatia = palavras.slice(i, i + porGrupo);
      grupos.push({
        inicio: fatia[0].t,
        fim: fatia[fatia.length - 1].t + fatia[fatia.length - 1].d,
        palavras: fatia
      });
    }
    return grupos;
  }

  /** Grupo ativo no instante t, com tolerancia para nao piscar entre blocos. */
  function grupoEm(grupos, t) {
    for (let i = 0; i < grupos.length; i++) {
      const g = grupos[i];
      const proximo = grupos[i + 1];
      const limite = proximo ? Math.min(proximo.inicio, g.fim + 0.4) : g.fim + 0.4;
      if (t >= g.inicio && t < limite) return g;
    }
    return null;
  }

  function paraSrt(palavras, porGrupo) {
    return agrupar(palavras, porGrupo).map((g, i) => {
      const fmt = s => {
        const h = String(Math.floor(s / 3600)).padStart(2, '0');
        const m = String(Math.floor(s / 60) % 60).padStart(2, '0');
        const seg = String(Math.floor(s) % 60).padStart(2, '0');
        const ms = String(Math.round((s % 1) * 1000)).padStart(3, '0');
        return `${h}:${m}:${seg},${ms}`;
      };
      return `${i + 1}\n${fmt(g.inicio)} --> ${fmt(g.fim)}\n${g.palavras.map(p => p.w).join(' ')}\n`;
    }).join('\n');
  }

  return { deTexto, deSrt, importar, agrupar, grupoEm, paraSrt };
})();

if (typeof module !== 'undefined') module.exports = Legenda;
