module.exports = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'http://better.elwazeer.tech', // Proxy to your server
        },
      ];
    },
  };