import {Composition, staticFile} from 'remotion';
import {Historinha} from './Historinha';
import neri from '../dados/01-neri.json';
import {duracaoTotal, FPS, pecaSchema, type Peca} from './pecas';

const peca = pecaSchema.parse(neri);

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Historinha"
      component={Historinha}
      durationInFrames={duracaoTotal(peca)}
      fps={FPS}
      width={1080}
      height={1920}
      schema={pecaSchema}
      defaultProps={peca as Peca}
      calculateMetadata={({props}) => ({
        durationInFrames: duracaoTotal(props),
      })}
    />
  );
};

export {staticFile};
