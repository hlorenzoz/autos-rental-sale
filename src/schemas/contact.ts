import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().optional().transform((v) => (v === '' ? undefined : v)),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactSchema>;
