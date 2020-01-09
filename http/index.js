const http = require('http'),
    fs = require('fs'),
    Koa = require('koa'),
    app = new Koa(),
    router = require('./router/index'),
    bodyParser = require('koa-bodyparser'),
    url = require('url'),
    path = require('path');

// app.use(async ctx => {
//     ctx.body = 'Hello http server.';
// });

app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods());

http.createServer(app.callback()).listen(80);

module.exports = app;