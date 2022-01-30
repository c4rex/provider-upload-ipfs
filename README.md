# c4rex/strapi-provider-upload-ipfs-http
Strapi upload provider that can add files to an ipfs node.

[![Tests](https://github.com/c4rex/strapi-provider-upload-ipfs-http/actions/workflows/ci.yml/badge.svg)](https://github.com/c4rex/strapi-provider-upload-ipfs-http/actions/workflows/ci.yml)

## Prerequisites

- NodeJS v14+
- Strapi v3.6.8+

## Installation

```bash
# using yarn
yarn add c4rex/strapi-provider-upload-ipfs-http

# using npm
npm install c4rex/strapi-provider-upload-ipfs-http --save
```

## Configurations

Your configuration is passed down to the provider. (e.g: `ipfs.create(config)`). You can see the complete list of options [here](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#custom-headers)

See the [using a provider](https://docs.strapi.io/developer-docs/latest/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.html#environment-variables) for setting and using environment variables in your configs.

### Provider Configuration

Default the provider is set for a local ipfs node, running the api on port 5001, a quick start for running a node can be found [here](https://docs.ipfs.io/how-to/command-line-quick-start/#prerequisites)

For a public accessible api and gateway you could use the one provided by [C4REX](c4rex.dev) see [config/c4rex.provider.upload.ipfs.js](./config/c4rex.provider.upload.ipfs.js)



`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: { // remove block in strapi 3.x
      provider: 'ipfs-http',
      providerOptions: {
        host: env('IPFS_HOST'),
        port: env('IPFS_PORT'),
        protocol: env('IPFS_PROTOCOL'),
        headers: {
          Authorizarion: env('IPFS_HEADERS_AUTHORIZATION'),
        },
      },
    },
  },
  // ...
});
```

### Security Middleware Configuration (strapi: 4+)

Due to the default settings in the Strapi Security Middleware you will need to modify the `contentSecurityPolicy` settings to properly see thumbnail previews in the Media Library. You should replace `strapi::security` string with the object bellow instead as explained in the [middleware configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html#loading-order) documentation.

`./config/middlewares.js`

```js
module.exports = [
  // ...
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', '<ipfs.gateway>'],
          'media-src': ["'self'", 'data:', 'blob:', '<ipfs.gateway>'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
];
```

# Testing
Integration test with various provider options provided

```
    yarn test
```

# Acknowledgement

- [ipfs-http-client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client)


# License

The [MIT](http://opensource.org/licenses/MIT "MIT") License (MIT).
