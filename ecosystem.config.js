module.exports = {
  apps: [
    {
      name: "octo-client",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "./apps/client",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "octo-back",
      script: "dist/main.js",
      cwd: "./apps/server",
      env: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      key: "octo_key.pem",
      user: "ubuntu",
      host: "18.234.93.85",
      ref: "origin/develop",
      repo: "https://github.com/JorgeRojas827/octo",
      path: "/home/ubuntu",
      "pre-deploy-local": "",
      "post-deploy":
        "source ~/.nvm/nvm.sh npm run build:web && npm run build:server && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      ssh_options: "ForwardAgent=yes",
    },
  },
};
