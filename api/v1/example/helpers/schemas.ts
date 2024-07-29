import { z } from 'zod';

export const validateLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateDataCotizacion = z.object({
  edad : z.number().int().refine(edad => edad >= 18 && edad <= 66),
  sumaAsegurada : z.number(),
  sexo : z.string().regex(/^[MF]$/),
  fumador : z.boolean()
})
