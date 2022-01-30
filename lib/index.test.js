'use strict';

const EXPECTED_CID = 'QmYgpWRJ1mZHVcwziSffaAtbLZzMqo3TepuKCH96buG7Fc';
const { basename } = require('path');
const strapiProviderUploadIpfsHttp = require('./index');

let fileMock = {
  buffer: Buffer.from('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64'),
  url: null,
};

test(`Verify if we can upload to ipfs with custom gateway and api`, () => {
  const ipfsUpload = strapiProviderUploadIpfsHttp.init({
    host: 'api.ipfs.c4rex.co',
    port: 443,
    protocol: 'https',
    headers: {
      Authorization: `Basic YXBpLWlwZnM6NFBJVVMzUg==`
    },
    gateway: 'https://c4rex.co',
  });

  ipfsUpload
    .upload(fileMock)
    .then(() => {
      expect(basename(fileMock.url)).toBe(EXPECTED_CID);
      ipfsUpload
        .delete(fileMock)
        .then(() => {})
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

test(`Verify if we can upload to ipfs with different host api`, () => {
  const ipfsUpload = strapiProviderUploadIpfsHttp.init({
    host: 'ipfs.infura.io',
    protocol: 'https'
  });

  ipfsUpload
    .upload(fileMock)
    .then(() => {
      expect(basename(fileMock.url)).toBe(EXPECTED_CID);
    })
    .catch(err => console.log(err));
});

test(`Verify if we can upload to ipfs with defaults`, () => {
  const ipfsUpload = strapiProviderUploadIpfsHttp.init({});

  ipfsUpload
    .upload(fileMock)
    .then(() => {
      expect(basename(fileMock.url)).toBe(EXPECTED_CID);
    })
    .catch(err => console.log(err));
});
