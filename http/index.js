const http = require('http'),
    express = require('express'),
    app = express(),
    registerRouter = require('./router'),
    Config = require('../config'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

registerRouter(app);

http.createServer(app).listen(Config.http.PORT);

module.exports = app;