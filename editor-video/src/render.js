/**
 * Renderizador. Desenha um quadro completo no canvas a partir de:
 *   video (HTMLVideoElement), preset, grupos de legenda e o tempo corrente.
 * Ordem das camadas: fundo -> video -> motion -> legenda.
 */

const Render = (() => {

  function cobrir(lv, av, lc, ac) {
    const e = Math.max(lc / lv, ac / av);
    return { l: lv * e, a: av * e };
  }
  function conter(lv, av, lc, ac) {
    const e = Math.min(lc / lv, ac / av);
    return { l: lv * e, a: av * e };
  }

  function caminhoArredondado(ctx, x, y, l, a, r) {
    const raio = Math.min(r, l / 2, a / 2);
    ctx.beginPath();
    ctx.moveTo(x + raio, y);
    ctx.arcTo(x + l, y, x + l, y + a, raio);
    ctx.arcTo(x + l, y + a, x, y + a, raio);
    ctx.arcTo(x, y + a, x, y, raio);
    ctx.arcTo(x, y, x + l, y, raio);
    ctx.closePath();
  }

  function desenharFundo(ctx, video, preset, L, A) {
    const f = preset.fundo || { tipo: 'solido', cores: ['#000'] };
    if (f.tipo === 'gradiente') {
      const g = ctx.createLinearGradient(0, 0, 0, A);
      g.addColorStop(0, f.cores[0]);
      g.addColorStop(1, f.cores[1] || f.cores[0]);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, L, A);
      return;
    }
    if (f.tipo === 'blur' && video && video.videoWidth) {
      const { l, a } = cobrir(video.videoWidth, video.videoHeight, L, A);
      ctx.save();
      ctx.filter = `blur(${f.desfoque || 50}px)`;
      ctx.drawImage(video, (L - l * 1.2) / 2, (A - a * 1.2) / 2, l * 1.2, a * 1.2);
      ctx.restore();
      if (f.escurecer) {
        ctx.fillStyle = `rgba(0,0,0,${f.escurecer})`;
        ctx.fillRect(0, 0, L, A);
      }
      return;
    }
    ctx.fillStyle = (f.cores && f.cores[0]) || '#000';
    ctx.fillRect(0, 0, L, A);
  }

  function desenharVideo(ctx, video, preset, L, A) {
    if (!video || !video.videoWidth) return;
    const v = preset.video || { encaixe: 'cover', escala: 1, offsetY: 0, cantos: 0 };
    const base = v.encaixe === 'contain'
      ? conter(video.videoWidth, video.videoHeight, L, A)
      : cobrir(video.videoWidth, video.videoHeight, L, A);
    const l = base.l * (v.escala || 1);
    const a = base.a * (v.escala || 1);
    const x = (L - l) / 2;
    const y = (A - a) / 2 + (v.offsetY || 0) * A;
    ctx.save();
    if (v.cantos) { caminhoArredondado(ctx, x, y, l, a, v.cantos); ctx.clip(); }
    ctx.drawImage(video, x, y, l, a);
    ctx.restore();
  }

  function desenharMotion(ctx, preset, L, A, progresso) {
    const m = preset.motion || {};
    if (m.barraProgresso) {
      const b = m.barraProgresso;
      const y = b.posicao === 'topo' ? 0 : A - b.altura;
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(0, y, L, b.altura);
      ctx.fillStyle = b.cor;
      ctx.fillRect(0, y, L * Math.min(1, Math.max(0, progresso)), b.altura);
    }
    if (m.etiqueta && m.etiqueta.texto) {
      const e = m.etiqueta;
      const tam = Math.round(L * 0.032);
      ctx.font = `600 ${tam}px Inter, system-ui, sans-serif`;
      const larg = ctx.measureText(e.texto).width;
      const padX = tam * 0.7, padY = tam * 0.45;
      const x = (L - (larg + padX * 2)) / 2;
      const y = e.posicao === 'topo' ? A * 0.05 : A * 0.9;
      ctx.fillStyle = e.fundo;
      caminhoArredondado(ctx, x, y, larg + padX * 2, tam + padY * 2, 999);
      ctx.fill();
      ctx.fillStyle = e.cor;
      ctx.textBaseline = 'top';
      ctx.fillText(e.texto, x + padX, y + padY);
    }
  }

  /** Escala do preset: os tamanhos sao pensados para 1080 de largura. */
  function fatorEscala(L) { return L / 1080; }

  function fonteDe(t, esc) {
    const peso = t.peso || 700;
    // presets pesados caem em uma display grossa; os leves, na fonte do sistema
    const reserva = peso >= 800 ? '"Arial Black", Impact, ' : '';
    return `${peso} ${Math.round(t.tamanho * esc)}px "${t.fonte}", ${reserva}system-ui, sans-serif`;
  }

  /** Anima a entrada do grupo. Devolve escala e deslocamento. */
  function animacaoDe(tipo, decorrido, esc) {
    const dur = 0.22;
    const p = Math.min(1, Math.max(0, decorrido / dur));
    const suave = 1 - Math.pow(1 - p, 3);
    switch (tipo) {
      case 'pop':       return { escala: 0.86 + 0.14 * suave, dy: 0, alfa: suave };
      case 'pop-forte': return { escala: 0.62 + 0.38 * suave, dy: 0, alfa: suave };
      case 'subir':     return { escala: 1, dy: (1 - suave) * 42 * esc, alfa: suave };
      case 'fade':      return { escala: 1, dy: 0, alfa: suave };
      case 'tremor': {
        const tr = decorrido < 0.16 ? Math.sin(decorrido * 90) * 7 * esc : 0;
        return { escala: 0.9 + 0.1 * suave, dy: tr, alfa: suave };
      }
      default:          return { escala: 1, dy: 0, alfa: 1 };
    }
  }

  function quebrarLinhas(ctx, palavras, larguraMax, espacoLarg) {
    const linhas = [];
    let atual = [], larg = 0;
    for (const p of palavras) {
      const w = ctx.measureText(p.texto).width;
      const nova = larg + (atual.length ? espacoLarg : 0) + w;
      if (atual.length && nova > larguraMax) {
        linhas.push({ itens: atual, largura: larg });
        atual = [p]; larg = w;
      } else {
        atual.push(p); larg = nova;
      }
    }
    if (atual.length) linhas.push({ itens: atual, largura: larg });
    return linhas;
  }

  function desenharLegenda(ctx, preset, grupo, tempo, L, A) {
    if (!grupo) return;
    const t = preset.texto;
    const esc = fatorEscala(L);
    const anim = animacaoDe(t.animacao, tempo - grupo.inicio, esc);
    if (anim.alfa <= 0) return;

    ctx.save();
    ctx.font = fonteDe(t, esc);
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.globalAlpha = anim.alfa;

    const itens = grupo.palavras.map(p => ({
      texto: t.maiuscula ? p.w.toLocaleUpperCase('pt-BR') : p.w,
      ativa: tempo >= p.t && tempo < p.t + p.d
    }));
    if (!itens.some(i => i.ativa)) {
      const passadas = grupo.palavras.filter(p => tempo >= p.t);
      if (passadas.length) itens[Math.min(passadas.length - 1, itens.length - 1)].ativa = true;
    }

    const folgaFundo = t.pilula ? t.pilula.padX * esc * 1.7
                     : t.caixa  ? t.caixa.padX  * esc * 0.5 : 0;
    const espaco = ctx.measureText(' ').width + (t.espacamento || 0) * esc * 6 + folgaFundo;
    const margem = L * 0.10;
    const linhas = quebrarLinhas(ctx, itens, L - margem * 2, espaco);

    const alturaLinha = t.tamanho * esc * (t.entrelinha || 1.2);
    const alturaTotal = linhas.length * alturaLinha;
    const centroY = A * t.posicao - alturaTotal / 2 + alturaLinha / 2 + anim.dy;

    ctx.translate(L / 2, centroY + alturaTotal / 2 - alturaLinha / 2);
    ctx.scale(anim.escala, anim.escala);
    ctx.translate(-L / 2, -(centroY + alturaTotal / 2 - alturaLinha / 2));

    linhas.forEach((linha, iL) => {
      let x = (L - linha.largura) / 2;
      const y = centroY + iL * alturaLinha;

      for (const item of linha.itens) {
        const larg = ctx.measureText(item.texto).width;

        if (t.caixa) {
          const c = t.caixa;
          ctx.save();
          ctx.fillStyle = c.cor;
          caminhoArredondado(ctx, x - c.padX * esc, y - (t.tamanho * esc) / 2 - c.padY * esc,
            larg + c.padX * 2 * esc, t.tamanho * esc + c.padY * 2 * esc, c.raio * esc);
          ctx.fill();
          ctx.restore();
        }
        if (t.pilula && item.ativa) {
          const p = t.pilula;
          ctx.save();
          ctx.fillStyle = p.cor;
          caminhoArredondado(ctx, x - p.padX * esc, y - (t.tamanho * esc) / 2 - p.padY * esc,
            larg + p.padX * 2 * esc, t.tamanho * esc + p.padY * 2 * esc, p.raio);
          ctx.fill();
          ctx.restore();
        }

        if (t.contorno && t.larguraContorno) {
          ctx.save();
          ctx.lineJoin = 'round';
          ctx.miterLimit = 2;
          ctx.strokeStyle = t.contorno;
          ctx.lineWidth = t.larguraContorno * esc;
          ctx.strokeText(item.texto, x, y);
          ctx.restore();
        }

        ctx.save();
        if (t.sombra) {
          ctx.shadowColor = t.sombra.cor;
          ctx.shadowBlur = t.sombra.blur * esc;
          ctx.shadowOffsetY = (t.sombra.y || 0) * esc;
        }
        ctx.fillStyle = item.ativa ? t.destaque : (t.corInativa || t.cor);
        ctx.fillText(item.texto, x, y);
        ctx.restore();

        x += larg + espaco;
      }
    });

    ctx.restore();
  }

  function quadro(ctx, video, preset, grupos, tempo, L, A, duracao) {
    ctx.clearRect(0, 0, L, A);
    desenharFundo(ctx, video, preset, L, A);
    desenharVideo(ctx, video, preset, L, A);
    desenharMotion(ctx, preset, L, A, duracao ? tempo / duracao : 0);
    desenharLegenda(ctx, preset, Legenda.grupoEm(grupos, tempo), tempo, L, A);
  }

  return { quadro, desenharFundo, desenharVideo, desenharMotion, desenharLegenda, caminhoArredondado };
})();

if (typeof module !== 'undefined') module.exports = Render;
