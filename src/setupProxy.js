const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    console.log('setting up proxy');
    app.use(
        '/_dash-*',
        createProxyMiddleware({
            target: 'http://localhost:9000',
        })
    );
};
