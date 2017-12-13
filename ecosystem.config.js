module.exports = {
  apps : [
    {
      name      : 'Demo App',
      script    : 'scripts/start.js',
      
      env: {
        NODE_ENV: 'development'
      },

      // In production we're proxying IPFS through nginx
      // for SSL.
      env_production : {
        IPFS_API_PORT: "5002",
        IPFS_DOMAIN: "demo.originprotocol.com",      
        NODE_ENV: 'production'
      }
    }
  ],

  "deploy" : {
    "production" : {
      "user" : "ubuntu",
      "host" : "op-demo",
      "repo" : "https://github.com/OriginProtocol/demo-dapp.git",
      "ref"  : "origin/master",
      "path" : "/home/ubuntu/apps/demo-dapp",
      "post-deploy" : "ln -s /home/ubuntu/apps/demo-dapp/shared/node_modules node_modules && npm install && truffle compile && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
};

