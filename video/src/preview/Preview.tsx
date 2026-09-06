import {Player} from '@remotion/player';
import {Legenda} from '../Legenda';

export const Preview: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Player
        component={Legenda}
        inputProps={{texto: 'Grupo de tipster e treta na certa'}}
        durationInFrames={150}
        fps={30}
        compositionWidth={1080}
        compositionHeight={1920}
        style={{width: 360, borderRadius: 12, overflow: 'hidden'}}
        controls
        loop
      />
    </div>
  );
};
