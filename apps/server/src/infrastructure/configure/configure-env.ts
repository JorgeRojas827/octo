import { z } from 'zod';

const appEnvSchema = z.object({
  APP_NAME: z.string(),
  APP_PORT: z.string().transform(Number),
  APP_KEY: z.string(),

  APP_JWT_SECRET: z.string(),
  APP_JWT_EXPIRE: z.string(),
});

const dbEnvSchema = z.object({
  DB_PORT: z.string().transform(Number),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  DB_URL: z.string().url(),
});

const throttleEnvSchema = z.object({
  THROTTLE_LIMIT: z.string().transform(Number),
  THROTTLE_TTL: z.string().transform(Number),
});

const langEnvSchema = z.object({
  DEFAULT_LANG: z.string(),
});

const githubSchema = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

export const envSchema = z.object({
  ...appEnvSchema.shape,
  ...dbEnvSchema.shape,
  ...throttleEnvSchema.shape,
  ...langEnvSchema.shape,
  ...githubSchema.shape,
});

export type TEnv = z.infer<typeof envSchema>;
