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
                        link: 'www.baidu.com',
                        title: '如何使用JavaScript的基本身份验证？ - 问答 - 云+社区 - 腾讯云',
                        date: '2018-8-14',
                        image: 'https://tse1-mm.cn.bing.net/th/id/OET.e144daeb23a44cf7b24f653ce32cd6ad?w=272&h=135&c=7&rs=1&o=5&pid=1.9',
                        rate: 3.5
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