module.exports = {
  apps: [{
    name: 'buckalew-financial-services',
    script: 'npm',
    args: 'start',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_staging: {
      NODE_ENV: 'development',
      PORT: 3001
    }
  }],

  deploy: {
    production: {
      user: 'deploy',
      host: '${PRODUCTION_SERVER_IP}',
      ref: 'origin/main',
      repo: 'git@github.com:larrybuckalew/buckalew-financial-services-nextjs.git',
      path: '/var/www/buckalew-financial-services',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    },
    staging: {
      user: 'deploy',
      host: '${STAGING_SERVER_IP}',
      ref: 'origin/develop',
      repo: 'git@github.com:larrybuckalew/buckalew-financial-services-nextjs.git',
      path: '/var/www/buckalew-financial-services-staging',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env staging',
      'pre-setup': ''
    }
  }
};