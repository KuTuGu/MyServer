const QueryType = require('./queries'),
    MutationType = require('./mutations');

module.exports = `
    ${QueryType}
    ${MutationType}
`;