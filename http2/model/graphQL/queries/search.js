module.exports = `
    type searchResItem{
        content: String
        link: String
    }
    type searchResInfo{
        res: [searchResItem]
        status: Boolean
        message: String
    }
`;