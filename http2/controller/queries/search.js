const SearchModel = require("../../model/mongoDB/search");

module.exports = {
    async search(parent, args, context, info){
        try{
            const { query } = args;

            [err, res] = await SearchModel.find({query}).then(
                data => [null, data],  err => [err, null]
            );

            if(err){
                console.error(err)
                return {
                    res: [],
                    status: false,
                    message: "Something wrong in server..."
                }
            }
            else{
                return {
                    res: [{
                        content: 'hello man',
                        link: 'www.baidu.com'
                    }],
                    status: true,
                    message: "Searched successfully."
                }
            }
        }
        catch(e){
            console.error(e);
            throw 'Something wrong in server...';
        }
    }
};