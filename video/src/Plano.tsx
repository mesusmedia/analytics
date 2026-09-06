import {AbsoluteFill, OffthreadVideo, staticFile, useVideoConfig} from 'remotion';
import {Legenda} from './Legenda';
import type {Plano as PlanoDados} from './pecas';

/**
 * Um plano da historinha: o clipe gerado + a legenda karaokê.
 * Enquanto o clipe não existe, entra um placeholder com o número do plano,
 * pra montar o corte e o ritmo antes de gastar geração.
 */
export const Plano: React.FC<{plano: PlanoDados; acento: string}> = ({
  plano,
  acento,
}) => {
  const {durationInFrames} = useVideoConfig();
  const legendaVisivel = plano.legenda && !plano.legenda.startsWith('(');

  return (
    <AbsoluteFill style={{backgroundColor: '#0b0b0b'}}>
      {plano.clipe ? (
        <OffthreadVideo
          src={staticFile(`clipes/${plano.clipe}`)}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      ) : (
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#161616',
            color: '#3a3a3a',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 900,
            fontSize: 260,
          }}
        >
          P{plano.n}
        </AbsoluteFill>
      )}

      {legendaVisivel ? (
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 72px 300px',
          }}
        >
          <Legenda
            texto={plano.legenda}
            acento={acento}
            duracao={durationInFrames}
          />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
