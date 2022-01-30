'use strict';

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'ipfs-http',
      providerOptions: {
        host: 'api.ipfs.c4rex.co',
        port: 443,
        protocol: 'https',
        headers: {
          Authorization: `Basic YXBpLWlwZnM6NFBJVVMzUg==`
        },
        gateway: 'https://c4rex.co',
      },
    },
  },
});
