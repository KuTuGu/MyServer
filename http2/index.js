const http2 = require('http2'),
    fs = require('fs'),
    Koa = require('koa'),
    app = new Koa(),
    url = require('url'),
    path = require('path');

app.use(async ctx => {
    ctx.body = 'Hello http2 server.';
});

http2.createSecureServer({
    key: fs.readFileSync('certificate/privatekey.pem'), // private
    cert: fs.readFileSync('certificate/certificate.pem') // public
}, app.callback()).listen(8080);