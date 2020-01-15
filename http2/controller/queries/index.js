const login = require('./login'),
    search = require('./search');

module.exports = {
    Query: Object.assign({}, login, search)
}