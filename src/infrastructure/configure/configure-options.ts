import { ConfigModuleOptions } from '@nestjs/config';
import { configLoader } from './configure-loader';
import { envSchema } from './configure-env';

export const configOptions: ConfigModuleOptions = {
  load: [configLoader],
  isGlobal: true,
  envFilePath: '.env',
  validate: (env) => envSchema.parse(env),
};
