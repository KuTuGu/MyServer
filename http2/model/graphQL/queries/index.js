const LoginType = require('./login'),
    SearchType = require('./search');

module.exports = `
    ${LoginType}
    ${SearchType}
    type Query {
        login(input: Login!): loginResInfo
        search(query: String!): searchResInfo
    }
`;