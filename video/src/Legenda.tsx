import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

export const legendaSchema = z.object({
  texto: z.string(),
});

export const Legenda: React.FC<z.infer<typeof legendaSchema>> = ({texto}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const palavras = texto.split(' ');
  const framesPorPalavra = durationInFrames / palavras.length;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0b0b0b',
        padding: 80,
      }}
    >
      <p
        style={{
          margin: 0,
          textAlign: 'center',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontWeight: 900,
          fontSize: 110,
          lineHeight: 1.1,
          textTransform: 'uppercase',
        }}
      >
        {palavras.map((palavra, i) => {
          const inicio = i * framesPorPalavra;
          const ativa = frame >= inicio;
          return (
            <span
              key={`${palavra}-${i}`}
              style={{
                color: ativa ? '#ffe600' : '#ffffff',
                opacity: interpolate(frame, [inicio - 4, inicio], [0.35, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              {palavra}{' '}
            </span>
          );
        })}
      </p>
    </div>
  );
};
