const SignupType = require('./signup');

module.exports = `
    ${SignupType}

    type Mutation {
        signup(input: Signup!): loginResInfo
    }
`;