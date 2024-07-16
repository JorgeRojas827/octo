export const env = {
  app: {
    port: 'APP_PORT',
    name: 'APP_NAME',
    key: 'APP_KEY',

    jwt: {
      secret: 'APP_JWT_SECRET',
      expire: 'APP_JWT_EXPIRE',
    },
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
  externalServices: {
    github: {
      clientId: 'GITHUB_CLIENT_ID',
      clientSecret: 'GITHUB_CLIENT_SECRET',
    },
  },
};

export const configLoader = () => env;
