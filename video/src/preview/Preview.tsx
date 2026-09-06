import {Player} from '@remotion/player';
import {Historinha} from '../Historinha';
import neri from '../../dados/01-neri.json';
import {duracaoTotal, FPS, pecaSchema} from '../pecas';

const peca = pecaSchema.parse(neri);

export const Preview: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 24,
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#e6e6e6',
      }}
    >
      <strong>{peca.titulo}</strong>
      <Player
        component={Historinha}
        inputProps={peca}
        durationInFrames={duracaoTotal(peca)}
        fps={FPS}
        compositionWidth={1080}
        compositionHeight={1920}
        style={{width: 360, borderRadius: 12, overflow: 'hidden'}}
        controls
        loop
      />
    </div>
  );
};
