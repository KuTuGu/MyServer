module.exports = `
    input Login {
        username: String
        password: String
    }

    type loginResInfo{
        status: Boolean
        message: String
        token: String
    }
`;