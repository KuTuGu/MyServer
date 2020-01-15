const http2 = require('http2'),
    express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    { ApolloServer, gql } = require('apollo-server-express'),
    typeDefs = require('./model/graphQL'),
    resolvers = require('./controller'),
    registerRouter = require('./router'),
    MongodbInfo = require('../certificate/password.info').mongodb,
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

// http2.createSecureServer({
//     key: fs.readFileSync('certificate/privatekey.pem'), // private
//     cert: fs.readFileSync('certificate/certificate.pem') // public
// }, app).listen(Config.http2.PORT, () => {
//     console.log(`🚀GraphQL Server ready at https://localhost:${Config.http2.PORT}${Config.http2.GraphqlPath}`)
// });

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