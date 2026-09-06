import {z} from 'zod';

export const planoSchema = z.object({
  n: z.number().int().positive(),
  /** Arquivo em `public/clipes/`. Vazio = ainda não gerado, entra placeholder. */
  clipe: z.string(),
  dur: z.number().positive(),
  legenda: z.string(),
});

export const pecaSchema = z.object({
  titulo: z.string(),
  tipster: z.string(),
  gancho: z.string(),
  /** Assinatura de cor da peça — o selo da capa do grupo. */
  acento: z.string(),
  /** Capa do grupo em `public/capas/`, usada no pack shot. */
  capa: z.string(),
  cta: z.string(),
  conformidade: z.string(),
  planos: z.array(planoSchema).min(1),
});

export type Peca = z.infer<typeof pecaSchema>;
export type Plano = z.infer<typeof planoSchema>;

export const FPS = 30;
export const emFrames = (segundos: number) => Math.round(segundos * FPS);
export const duracaoTotal = (peca: Peca) =>
  emFrames(peca.planos.reduce((total, p) => total + p.dur, 0));
