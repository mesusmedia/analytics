/**
 * Cola tudo: estado, interface, loop de desenho e exportacao.
 */
(() => {
  const $ = id => document.getElementById(id);

  const video  = $('fonte');
  const tela   = $('tela');
  const ctx    = tela.getContext('2d');

  const estado = {
    preset: structuredClone(window.PRESETS[0]),
    presetId: window.PRESETS[0].id,
    formato: window.FORMATOS[0],
    palavras: [],
    grupos: [],
    duracao: 0,
    temVideo: false,
    gravando: false
  };

  /* ---------- legenda ---------- */

  function reagrupar() {
    estado.grupos = Legenda.agrupar(estado.palavras, estado.preset.texto.palavrasPorGrupo);
  }

  function definirLegenda(conteudo) {
    estado.palavras = Legenda.importar(conteudo, estado.duracao || 15);
    reagrupar();
    aviso(estado.palavras.length
      ? `${estado.palavras.length} palavras sincronizadas.`
      : 'Nenhuma palavra reconhecida.');
    desenhar();
  }

  /* ---------- presets ---------- */

  function montarListaPresets() {
    const lista = $('listaPresets');
    lista.innerHTML = '';
    for (const p of window.PRESETS) {
      const b = document.createElement('button');
      b.className = 'preset';
      b.type = 'button';
      b.setAttribute('aria-pressed', String(p.id === estado.presetId));
      b.innerHTML =
        `<div class="fam">${p.familia}</div>` +
        `<div class="nome">${p.nome}</div>` +
        `<div class="res">${p.resumo}</div>`;
      b.addEventListener('click', () => aplicarPreset(p.id));
      lista.appendChild(b);
    }
  }

  function aplicarPreset(id) {
    const base = window.PRESETS.find(p => p.id === id);
    if (!base) return;
    estado.presetId = id;
    estado.preset = structuredClone(base);
    reagrupar();
    montarListaPresets();
    sincronizarControles();
    desenhar();
  }

  /* ---------- controles ---------- */

  function sincronizarControles() {
    const t = estado.preset.texto;
    $('ajTamanho').value  = t.tamanho;   $('vTamanho').textContent = t.tamanho;
    $('ajPosicao').value  = Math.round(t.posicao * 100);
    $('vPosicao').textContent = Math.round(t.posicao * 100) + '%';
    $('ajGrupo').value    = t.palavrasPorGrupo;
    $('vGrupo').textContent = t.palavrasPorGrupo;
    $('ajCor').value      = paraHex(t.cor);
    $('ajDestaque').value = paraHex(t.destaque);
    $('ajEtiqueta').value = (estado.preset.motion.etiqueta || {}).texto || '';
  }

  function paraHex(cor) {
    if (!cor) return '#ffffff';
    if (cor.startsWith('#')) return cor.length === 4
      ? '#' + [...cor.slice(1)].map(c => c + c).join('') : cor.slice(0, 7);
    const m = cor.match(/[\d.]+/g);
    if (!m) return '#ffffff';
    return '#' + m.slice(0, 3).map(n => (+n).toString(16).padStart(2, '0')).join('');
  }

  function ligarControles() {
    $('ajTamanho').addEventListener('input', e => {
      estado.preset.texto.tamanho = +e.target.value;
      $('vTamanho').textContent = e.target.value; desenhar();
    });
    $('ajPosicao').addEventListener('input', e => {
      estado.preset.texto.posicao = +e.target.value / 100;
      $('vPosicao').textContent = e.target.value + '%'; desenhar();
    });
    $('ajGrupo').addEventListener('input', e => {
      estado.preset.texto.palavrasPorGrupo = +e.target.value;
      $('vGrupo').textContent = e.target.value; reagrupar(); desenhar();
    });
    $('ajCor').addEventListener('input', e => {
      estado.preset.texto.cor = e.target.value;
      estado.preset.texto.corInativa = e.target.value; desenhar();
    });
    $('ajDestaque').addEventListener('input', e => {
      estado.preset.texto.destaque = e.target.value; desenhar();
    });
    $('ajEtiqueta').addEventListener('input', e => {
      const txt = e.target.value.trim();
      if (!txt) { estado.preset.motion.etiqueta = null; }
      else {
        estado.preset.motion.etiqueta = Object.assign(
          { cor: '#FFFFFF', fundo: 'rgba(0,0,0,0.55)', posicao: 'topo' },
          estado.preset.motion.etiqueta || {}, { texto: txt });
      }
      desenhar();
    });
    $('btnReset').addEventListener('click', () => aplicarPreset(estado.presetId));
  }

  /* ---------- formato ---------- */

  function montarFormatos() {
    const sel = $('formato');
    sel.innerHTML = '';
    for (const f of window.FORMATOS) {
      const o = document.createElement('option');
      o.value = f.id; o.textContent = f.nome;
      sel.appendChild(o);
    }
    sel.addEventListener('change', e => {
      estado.formato = window.FORMATOS.find(f => f.id === e.target.value);
      tela.width = estado.formato.largura;
      tela.height = estado.formato.altura;
      $('tagFormato').textContent = `${estado.formato.largura}×${estado.formato.altura}`;
      desenhar();
    });
  }

  /* ---------- desenho ---------- */

  function desenhar() {
    Render.quadro(ctx, estado.temVideo ? video : null, estado.preset,
      estado.grupos, video.currentTime || 0,
      tela.width, tela.height, estado.duracao);
    atualizarTempo();
  }

  function laco() {
    desenhar();
    if (!video.paused && !video.ended) requestAnimationFrame(laco);
  }

  function fmt(s) {
    s = Math.max(0, s || 0);
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  }

  function atualizarTempo() {
    $('tempo').textContent = `${fmt(video.currentTime)} / ${fmt(estado.duracao)}`;
    if (estado.duracao && !$('scrub').matches(':active')) {
      $('scrub').value = (video.currentTime / estado.duracao) * 100;
    }
  }

  function aviso(msg) { $('status').textContent = msg; }

  /* ---------- video ---------- */

  $('arqVideo').addEventListener('change', e => {
    const arq = e.target.files[0];
    if (!arq) return;
    video.src = URL.createObjectURL(arq);
    video.addEventListener('loadedmetadata', () => {
      estado.temVideo = true;
      estado.duracao = video.duration;
      $('btnPlay').disabled = false;
      $('scrub').disabled = false;
      $('btnExportar').disabled = false;
      if (!estado.palavras.length && $('txtLegenda').value.trim()) {
        definirLegenda($('txtLegenda').value);
      }
      aviso(`Vídeo carregado: ${video.videoWidth}×${video.videoHeight}, ${fmt(video.duration)}.`);
      desenhar();
    }, { once: true });
  });

  $('btnPlay').addEventListener('click', () => {
    if (video.paused) { video.play(); $('btnPlay').textContent = 'Pause'; laco(); }
    else { video.pause(); $('btnPlay').textContent = 'Play'; }
  });
  video.addEventListener('ended', () => { $('btnPlay').textContent = 'Play'; });
  // qualquer salto no tempo redesenha, inclusive os feitos por codigo
  video.addEventListener('seeked', desenhar);
  video.addEventListener('timeupdate', () => { if (video.paused) desenhar(); });

  $('scrub').addEventListener('input', e => {
    if (!estado.duracao) return;
    video.currentTime = (e.target.value / 100) * estado.duracao;
    desenhar();
  });

  /* ---------- entrada de legenda ---------- */

  $('btnAplicarTexto').addEventListener('click', () => definirLegenda($('txtLegenda').value));
  $('btnImportar').addEventListener('click', () => $('arqSrt').click());
  $('arqSrt').addEventListener('change', e => {
    const arq = e.target.files[0];
    if (!arq) return;
    arq.text().then(txt => { $('txtLegenda').value = txt; definirLegenda(txt); });
  });
  $('btnBaixarSrt').addEventListener('click', () => {
    if (!estado.palavras.length) return aviso('Nada para exportar ainda.');
    const srt = Legenda.paraSrt(estado.palavras, estado.preset.texto.palavrasPorGrupo);
    baixar(new Blob([srt], { type: 'text/plain' }), 'legenda.srt');
  });

  function baixar(blob, nome) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nome;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  /* ---------- exportação ---------- */

  $('btnExportar').addEventListener('click', async () => {
    if (estado.gravando || !estado.temVideo) return;
    estado.gravando = true;
    $('btnExportar').disabled = true;

    const fluxo = tela.captureStream(30);
    try {
      const doVideo = video.captureStream ? video.captureStream()
                    : video.mozCaptureStream ? video.mozCaptureStream() : null;
      const faixa = doVideo && doVideo.getAudioTracks()[0];
      if (faixa) fluxo.addTrack(faixa);
    } catch (e) {
      aviso('Áudio não pôde ser capturado. Gravando só a imagem.');
    }

    const tipo = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']
      .find(t => MediaRecorder.isTypeSupported(t));
    const gravador = new MediaRecorder(fluxo, { mimeType: tipo, videoBitsPerSecond: 8_000_000 });
    const pedacos = [];
    gravador.ondataavailable = ev => ev.data.size && pedacos.push(ev.data);

    const fim = new Promise(r => { gravador.onstop = r; });

    video.pause();
    video.currentTime = 0;
    await new Promise(r => video.addEventListener('seeked', r, { once: true }));

    gravador.start(200);
    video.play();

    const desenhaGravando = () => {
      desenhar();
      const restante = estado.duracao - video.currentTime;
      aviso(`Gravando… faltam ${fmt(Math.max(0, restante))}`);
      if (!video.ended && !video.paused) requestAnimationFrame(desenhaGravando);
      else gravador.stop();
    };
    requestAnimationFrame(desenhaGravando);

    await fim;
    baixar(new Blob(pedacos, { type: tipo }), `clip-${estado.presetId}.webm`);
    aviso('Pronto. Arquivo baixado.');
    estado.gravando = false;
    $('btnExportar').disabled = false;
    $('btnPlay').textContent = 'Play';
  });

  /* ---------- partida ---------- */

  montarListaPresets();
  montarFormatos();
  ligarControles();
  sincronizarControles();

  $('txtLegenda').value =
    'Isso aqui muda tudo no seu conteúdo. Presta atenção nos próximos dez segundos.';
  definirLegenda($('txtLegenda').value);

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(desenhar);
  desenhar();
  aviso('Carregue um vídeo para começar.');
})();
