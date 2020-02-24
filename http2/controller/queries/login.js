const jwt = require('jsonwebtoken'),
    jwtSecret = require('../../../password.js').jwt,
    jwtConfig = require('../../../config').jwt,
    crypto = require('crypto'),
    UserModel = require("../../model/mongoDB/user");

module.exports = {
    async login(parent, args, context, info){
        try{
            const { input: { username, password } } = args,
                hmac = crypto.createHmac('sha256', password);

            hmac.update(password);

            const [err, res] = await UserModel.find({name: username}).then(
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
                if(`${hmac.digest('hex')}` === res[0].passwd){
                    let obj = {};
                    
                    jwtConfig.data.map(key => {
                        if(key === 'secret')
                            obj.secret = password;
                        else
                            obj[key] = res[0][key]
                    });

                    return {
                        status: true,
                        message: 'Login in successfully.',
                        token: jwt.sign(obj, jwtSecret.secret, jwtConfig.options),
                    }   
                }
                else{
                    return {
                        status: false,
                        message: 'Wrong password.'
                    }   
                }
            }
            else{
                return {
                    status: false,
                    message: 'No user.'
                }
            }
        }
        catch(e){
            console.error(e);
            throw 'Something wrong in server...';
        }
    }
};