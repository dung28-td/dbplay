const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function setupProxy(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
}