/* eslint-disable @typescript-eslint/naming-convention */
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.configDotenv();

const zodEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3333),
})

const env = zodEnvSchema.safeParse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
});

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  throw new Error('Invalid environment variables');
}

export const ENV = env.data;
