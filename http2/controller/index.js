const Query = require('./queries/index'),
    Mutation = require('./mutations/index');

module.exports = Object.assign({}, Query, Mutation);