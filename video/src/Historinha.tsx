import {AbsoluteFill, Img, Sequence, staticFile} from 'remotion';
import {Plano} from './Plano';
import {Rodape} from './Rodape';
import {emFrames, pecaSchema, type Peca} from './pecas';

export {pecaSchema};

/**
 * A historinha inteira, dirigida por dados. Tipster novo é JSON novo:
 * nenhuma edição, nenhum keyframe na mão.
 */
export const Historinha: React.FC<Peca> = (peca) => {
  let cursor = 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      {peca.planos.map((plano) => {
        const inicio = cursor;
        const duracao = emFrames(plano.dur);
        cursor += duracao;

        return (
          <Sequence
            key={plano.n}
            from={inicio}
            durationInFrames={duracao}
            name={`P${plano.n} · ${plano.legenda || plano.clipe || 'sem clipe'}`}
          >
            <Plano plano={plano} acento={peca.acento} />
            {plano.n === peca.planos.length && peca.capa ? (
              <AbsoluteFill
                style={{alignItems: 'center', justifyContent: 'center'}}
              >
                <Img
                  src={staticFile(`capas/${peca.capa}`)}
                  style={{
                    width: 560,
                    borderRadius: 32,
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                  }}
                />
              </AbsoluteFill>
            ) : null}
          </Sequence>
        );
      })}

      <Rodape texto={peca.conformidade} />
    </AbsoluteFill>
  );
};
