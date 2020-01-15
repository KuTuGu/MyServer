const http = require('http'),
    express = require('express'),
    app = express(),
    registerRouter = require('./router'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

const PORT = 80;

registerRouter(app);

http.createServer(app).listen(PORT);

module.exports = app;