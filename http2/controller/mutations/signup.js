const crypto = require('crypto'),
    UserModel = require("../../model/mongoDB/user");

module.exports = {
    async signup(parent, args, context, info){
        try{
            const { input: { username, password } } = args,
                hmac = crypto.createHmac('sha256', password);
            
            hmac.update(password);
                
            const user = new UserModel({
                name: username,
                passwd: `${hmac.digest('hex')}`,
                authority: 1,
            }),
            [err, res] = await UserModel.find({name: username}).then(
                data => [null, data],  err => [err, null]
            );

            if(err){
                console.error(err)
                return {
                    status: false,
                    message: 'Something wrong in server...'
                }
            }
            else if(res && res.length){
                return {
                    status: false,
                    message: 'Same username exits.'
                }
            }
            else{
                const [err, res] = await user.save().then(
                    data => [null, data],  err => [err, null]
                );

                if(err){
                    console.error(err)
                    return {
                        status: false,
                        message: 'Something wrong in server...'
                    }
                }
                else{
                    return {
                        status: true,
                        message: 'Sign up successfully.'
                    }
                }
            }
        }
        catch(e){
            console.error(e);
            throw 'Something wrong in server...';
        }
    }
};