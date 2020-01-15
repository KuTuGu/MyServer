const express = require('express'),
    bodyParser = require('body-parser'),
    Config = require('../../config'),
    path = require('path'),
    jwt = require('jsonwebtoken'),
    jwtSecret = require('../../certificate/password.info').jwt,
    mongo_express = require('mongo-express/lib/middleware'),
    generate_mongo_express_config = require('../../mongo_express_config'); 

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use((req, res, next) => {
        let error = {};

        if(req.path === Config.http2.GraphqlPath && req.method === "POST"){
            const whiteQuery = ['login', 'signup'];

            if(whiteQuery.indexOf(req.body.operationName) <= -1){
                jwt.verify(req.headers.authorization, jwtSecret.secret, (err, decoded) => {console.log(req.headers.authorization, jwtSecret,)
                    if (err) 
                        error = err;
                    else{
                        console.log(decoded)
                    }
                })
            }
        }

        next(error);
    })

    app.use((err, req, res, next) => {
        if (err.name === 'JsonWebTokenError') {
          res.status(401).send('Invalid token...');
        }
        else{
            next();
        }
    });

    // app.use('/mongo_express', mongo_express(generate_mongo_express_config(
    //     {
    //         // Setting the connection string will only give access to that database
    //         // to see more databases you need to set mongodb.admin to true or add databases to the mongodb.auth list
    //         db:       `User${username}`,
    //         host:     MongodbInfo.HOST,
    //         port:     MongodbInfo.PORT,
    //       //   ssl:      true,
    //         username: "tet",
    //         password: "tet",
    //     }
    // )));

    // app.get('/blog', RepoAutoSyn.getLatestRepo);

    app.use('/',  express.static(path.join(__dirname,'..','page', 'dist')));
}