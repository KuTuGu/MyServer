const express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    { ApolloServer, gql } = require('apollo-server-express'),
    typeDefs = require('./model/graphQL'),
    resolvers = require('./controller'),
    registerRouter = require('./router'),
    MongodbInfo = require('../password.js').mongodb,
    Config = require('../config'),
    fs = require('fs'),
    url = require('url');

registerRouter(app);

const server = new ApolloServer({ 
    typeDefs: gql`${typeDefs}`, 
    resolvers,
    path: Config.http2.GraphqlPath,
});

server.applyMiddleware({ app });


app.listen(Config.http2.PORT, () => {
    console.log(`🚀GraphQL server ready at http://localhost:${Config.http2.PORT}${Config.http2.GraphqlPath}`)
});


// mongoDB
mongoose.connect(`mongodb://${MongodbInfo.username}:${MongodbInfo.passwd}@${Config.mongodb.HOST}:${Config.mongodb.PORT}/${Config.mongodb.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const adminDB = mongoose.connection;

adminDB.on('error', () => {
    console.error(`Connect error to: mongodb://${MongodbInfo.username}:${MongodbInfo.passwd}@${Config.mongodb.HOST}:${Config.mongodb.PORT}/${Config.mongodb.DB}`)
});
adminDB.once('open', function() {
    console.log(`Connected to: mongodb://${MongodbInfo.username}:${MongodbInfo.passwd}@${Config.mongodb.HOST}:${Config.mongodb.PORT}/${Config.mongodb.DB}`)
    global.adminDB = adminDB;
});