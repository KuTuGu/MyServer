const jwt = require('jsonwebtoken'),
    jwtSecret = require('../../../certificate/password.info').jwt,
    jwtConfig = require('../../../config').jwt,
    crypto = require('crypto'),
    UserModel = require("../../model/mongoDB/user");

module.exports = {
    async login(parent, args, context, info){
        try{
            const { input: { username, password } } = args,
                hmac = crypto.createHmac('sha256', password);

            hmac.update(password);

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
                if(`${hmac.digest('hex')}` === res[0].passwd){
                    let obj = {};
                    
                    jwtConfig.data.map(key => {
                        obj[key] = res[0][key]
                    });

                    console.log('hi', context.res);
                    context.res.cookie("test", "123123", {
                        domain: 'localhost'
                    });
                    // console.log(Object.keys(request.res))

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