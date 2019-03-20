const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'https://api.github.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
  app.use(
    '/nonapi',
    proxy({
      target: 'https://github.com',
      changeOrigin: true,
      pathRewrite: {
        '^/nonapi': '',
      },
    })
  );
};
