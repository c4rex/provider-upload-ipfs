'use strict';

const { basename } = require('path');
const { create } = require('ipfs-http-client')

module.exports = {
  init(config) {

    const ipfs = create({
      host: 'localhost',
      port: 5001,
      protocol: 'http',
     ...config
    })

    return {
        upload: async (file) => {
        const response = await ipfs.add(file.buffer);
        const { cid } = response;
        const { host, protocol } = ipfs.getEndpointConfig();
        file.url = config.gateway ? `${config.gateway}/ipfs/${cid}` : `${protocol}//${host}/ipfs/${cid}`;
        },
       delete: async (file) => {
          await ipfs.pin.rm(basename(file.url))
      }
    };
  },
};
