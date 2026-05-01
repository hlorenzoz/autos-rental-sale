import { z } from 'zod';

const envSchema = z.object({
  PUBLIC_SITE_URL: z.url().default('http://localhost:4321'),
  PUBLIC_SITE_NAME: z.string().min(1).default('Autos Rental & Sale'),
});

export const env = envSchema.parse(import.meta.env);
export type Env = z.infer<typeof envSchema>;
