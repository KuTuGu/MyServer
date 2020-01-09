const crypto = require('crypto'),
    child_process = require('child_process'),
    githubInfo = require('../../certificate/github.info');

const RepoAutoSyn = {
    async getLatestRepo(ctx, next){
        let sign = ctx.request.headers['x-hub-signature'],  // sha1 sign
            event = ctx.request.headers['x-github-event'],    // push
            commitID = ctx.request.headers['x-github-delivery']; // commitID

        if(event === 'push'){
            // calc sha1 according to body and secret
            let hmac = crypto.createHmac('sha1', githubInfo.passwd);
            hmac.update(Buffer.from(JSON.stringify(ctx.request.body)));

            // verification sign
            let signature = 'sha1=' + hmac.digest('hex');
            if(signature === sign){
                let pwd = process.cwd(); 
                child_process.execSync(`bash ${pwd}\\script\\pullRepo.sh`);
            }
            else
                console.error(`Wrong signature! Calc: ${signature}, Get: ${sign}`);
        }
        else
            console.error('Wrong event. Expect `push`.');
        ctx.body = ctx.request.body;
    }
}

module.exports = RepoAutoSyn;