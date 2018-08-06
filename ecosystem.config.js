module.exports = {
  apps: [
    {
      name: 'API',
      script: './server/index.js',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
