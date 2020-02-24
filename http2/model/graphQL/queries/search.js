module.exports = `
    type searchResItem{
        content: String
        link: String
        title: String
        data: String
        image: String
        rate: Float
    }
    type searchResInfo{
        res: [searchResItem]
        status: Boolean
        message: String
    }
`;