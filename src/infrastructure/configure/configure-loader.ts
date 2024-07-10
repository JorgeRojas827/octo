export const env = {
  app: {
    port: 'APP_PORT',
    name: 'APP_NAME',
    key: 'APP_KEY',
  },
  db: {
    host: 'DB_HOST',
    port: 'DB_PORT',
    user: 'DB_USER',
    pass: 'DB_PASS',
    name: 'DB_NAME',
    url: 'DB_URL',
  },
  config: {
    throttle: {
      limit: 'THROTTLE_LIMIT',
      ttl: 'THROTTLE_TTL',
    },
    lang: {
      defaultLang: 'DEFAULT_LANG',
    },
  },
};

export const configLoader = () => env;
