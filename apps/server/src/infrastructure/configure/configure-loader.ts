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
    google: {
      geminiApiKey: 'GOOGLE_GEMINI_API_KEY',
      geminiModel: 'GOOGLE_GEMINI_MODEL',
      systemPrompt: 'GOOGLE_GEMINI_SYSTEM_PROMPT',
      userPrompt: 'GOOGLE_GEMINI_USER_PROMPT',
    },
  },
};

export const configLoader = () => env;
