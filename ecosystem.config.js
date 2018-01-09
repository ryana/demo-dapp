module.exports = {
  apps : [
    {
      name      : 'Demo App',
      script    : 'scripts/start.js',
      
      env: {
        NODE_ENV: 'development'
      },

      env_development : {
        HIDE_LIST_URL: "https://raw.githubusercontent.com/OriginProtocol/demo-dapp/hide_list/hidelist.json",
      },

      // In production we're proxying IPFS through nginx
      // for SSL.
      env_production : {
        MAX_UPLOAD_BYTES: 1900000,
        IPFS_API_PORT: "5002",
        IPFS_DOMAIN: "demo.originprotocol.com",      
        NODE_ENV: 'production'
      }
    }
  ]

};

