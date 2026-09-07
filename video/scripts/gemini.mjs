// Camada fina sobre a API do Google AI Studio.
// Nao fixamos ID de modelo em lugar nenhum: perguntamos a conta quais existem e
// derivamos a forma da chamada de `supportedGenerationMethods`. Assim o pipeline
// nao quebra quando o Google renomeia ou aposenta um modelo.

const BASE = 'https://generativelanguage.googleapis.com/v1beta';

export function chave() {
  const k = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!k) {
    throw new Error(
      'Falta GEMINI_API_KEY. Pegue em https://aistudio.google.com/apikey e ' +
        'coloque no .env (veja .env.example). Nunca comite a chave.',
    );
  }
  return k;
}

async function chamar(caminho, {metodo = 'GET', corpo} = {}) {
  const r = await fetch(`${BASE}/${caminho}`, {
    method: metodo,
    headers: {
      'x-goog-api-key': chave(),
      ...(corpo ? {'content-type': 'application/json'} : {}),
    },
    ...(corpo ? {body: JSON.stringify(corpo)} : {}),
  });

  const texto = await r.text();
  let dados;
  try {
    dados = JSON.parse(texto);
  } catch {
    throw new Error(`${r.status} resposta nao-JSON de ${caminho}: ${texto.slice(0, 400)}`);
  }
  if (!r.ok) {
    const msg = dados?.error?.message ?? texto.slice(0, 400);
    throw new Error(`${r.status} ${caminho}: ${msg}`);
  }
  return dados;
}

export async function listarModelos() {
  const todos = [];
  let token;
  do {
    const p = new URLSearchParams({pageSize: '200'});
    if (token) p.set('pageToken', token);
    const pagina = await chamar(`models?${p}`);
    todos.push(...(pagina.models ?? []));
    token = pagina.nextPageToken;
  } while (token);
  return todos;
}

const nome = (m) => m.name.replace(/^models\//, '');
const metodos = (m) => m.supportedGenerationMethods ?? [];

/** Modelos que geram imagem: nome indica imagem e sabem generateContent/predict. */
export const modelosDeImagem = (ms) =>
  ms.filter(
    (m) =>
      /image|imagen/i.test(nome(m)) &&
      !/embedding/i.test(nome(m)) &&
      metodos(m).some((x) => ['generateContent', 'predict'].includes(x)),
  );

/** Modelos que geram video: a chamada e sempre longa (predictLongRunning). */
export const modelosDeVideo = (ms) =>
  ms.filter(
    (m) => /veo|video/i.test(nome(m)) || metodos(m).includes('predictLongRunning'),
  );

export function escolher(candidatos, preferido, rotulo) {
  if (preferido) {
    const achado = candidatos.find((m) => nome(m) === preferido);
    if (!achado) {
      throw new Error(
        `Modelo "${preferido}" nao esta disponivel nesta chave. ` +
          `Rode "npm run modelos" e use um destes: ${candidatos.map(nome).join(', ') || '(nenhum)'}`,
      );
    }
    return achado;
  }
  if (!candidatos.length) {
    throw new Error(
      `Nenhum modelo de ${rotulo} liberado nesta chave. Rode "npm run modelos" ` +
        'para ver a lista completa; pode ser plano ou regiao.',
    );
  }
  return candidatos[0];
}

export {chamar, nome as nomeDoModelo, metodos as metodosDoModelo};

/** Erro de operação é para o operador ler, não para virar stack trace. */
export function encerrarComErro(e) {
  console.error(`\n${e.message}\n`);
  process.exit(1);
}
