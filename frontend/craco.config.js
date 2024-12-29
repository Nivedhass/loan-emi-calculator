// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Add polyfills for Node.js core modules
        webpackConfig.resolve.fallback = {
          ...webpackConfig.resolve.fallback,
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
        };
        return webpackConfig;
      },
    },
  };
  