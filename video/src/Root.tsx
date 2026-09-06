import {Composition} from 'remotion';
import {Legenda, legendaSchema} from './Legenda';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Legenda"
      component={Legenda}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
      schema={legendaSchema}
      defaultProps={{
        texto: 'Grupo de tipster e treta na certa',
      }}
    />
  );
};
