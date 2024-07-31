module.exports = {
  apps: [
    {
      script: "npm start:web",
    },
  ],

  deploy: {
    production: {
      key: "octo_key.pem",
      user: "ubuntu",
      host: "54.159.109.95",
      ref: "origin/develop",
      repo: "https://github.com/JorgeRojas827/octo",
      path: "/home/ubuntu",
      "pre-deploy-local": "",
      "post-deploy":
        "source ~/.nvm/nvm.sh && npm install && cd /apps/client && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      ssh_options: "ForwardAgent=yes",
    },
  },
};
