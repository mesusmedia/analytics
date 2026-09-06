import {interpolate, useCurrentFrame} from 'remotion';
import {z} from 'zod';

export const legendaSchema = z.object({
  texto: z.string(),
  acento: z.string().default('#ffe600'),
  /** Em quantos frames a legenda inteira acende. */
  duracao: z.number().positive().default(150),
});

/**
 * Legenda karaokê: acende palavra a palavra na cadência da duração do plano.
 * Nunca use frame fixo aqui — plano mais curto tem que acender mais rápido.
 */
export const Legenda: React.FC<z.infer<typeof legendaSchema>> = ({
  texto,
  acento = '#ffe600',
  duracao = 150,
}) => {
  const frame = useCurrentFrame();
  const palavras = texto.split(' ').filter(Boolean);
  const framesPorPalavra = duracao / Math.max(palavras.length, 1);

  return (
    <p
      style={{
        margin: 0,
        textAlign: 'center',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 900,
        fontSize: 104,
        lineHeight: 1.08,
        textTransform: 'uppercase',
        textShadow: '0 6px 24px rgba(0,0,0,0.75)',
      }}
    >
      {palavras.map((palavra, i) => {
        const inicio = i * framesPorPalavra;
        return (
          <span
            key={`${palavra}-${i}`}
            style={{
              color: frame >= inicio ? acento : '#ffffff',
              opacity: interpolate(frame, [inicio - 4, inicio], [0.4, 1], {
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
  );
};
