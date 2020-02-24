const express = require('express'),
    bodyParser = require('body-parser'),
    Config = require('../../config'),
    path = require('path'),
    jwt = require('jsonwebtoken'),
    jwtSecret = require('../../password.js').jwt,
    mongo_express = require('mongo-express/lib/middleware'),
    generate_mongo_express_config = require('../../mongo_express_config'); 

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(`/${Config.http2.GraphqlPath}`, (req, res, next) => {
        let error = {};

        if(req.method === "POST"){
            const whiteQuery = ['login', 'signup'];

            if(whiteQuery.indexOf(req.body.operationName) <= -1){
                jwt.verify(req.headers.authorization, jwtSecret.secret, (err, decoded) => {console.log(req.headers.authorization, jwtSecret,)
                    if (err) 
                        error = err;
                })
            }
        }

        next(error);
    })

    app.use('/mongo_express', (req, res, next) => {
        let result, token = getToken(req.headers.cookie)
        jwt.verify(token, jwtSecret.secret, (error, decoded) => {
            if (error) {
              next(error)
            }
            result = decoded;
        })
        console.log(result)
        return mongo_express(generate_mongo_express_config({
            // Setting the connection string will only give access to that database
            // to see more databases you need to set mongodb.admin to true or add databases to the mongodb.auth list
            db:       Config.mongodb.DB,
            host:     Config.mongodb.HOST,
            port:     Config.mongodb.PORT,
            // ssl:      true,
            username: result.name,
            password: result.secret,
        }))(req, res, next)
    });

    app.use((err, req, res, next) => {
        if (err.name === 'JsonWebTokenError') {
          res.status(401).send('Invalid token...');
        }
        else{
            next();
        }
    });

    // app.get('/blog', RepoAutoSyn.getLatestRepo);

    app.use('/',  express.static(path.join(__dirname,'..','page', 'dist')));

    function getToken(cookie){
        let arr, reg=new RegExp("(^| )token=([^;]*)(;|$)");
    
        if(arr = cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
}