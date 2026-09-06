import {AbsoluteFill} from 'remotion';

/**
 * Rodapé de conformidade. Visível em 100% do tempo, por obrigação legal —
 * por isso mora na composição e não na edição, onde dá pra esquecer.
 */
export const Rodape: React.FC<{texto: string}> = ({texto}) => {
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', pointerEvents: 'none'}}>
      <div
        style={{
          padding: '28px 48px 44px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85) 42%)',
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'rgba(255,255,255,0.92)',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 26,
            lineHeight: 1.35,
            textAlign: 'center',
            textWrap: 'balance',
          }}
        >
          {texto}
        </p>
      </div>
    </AbsoluteFill>
  );
};
