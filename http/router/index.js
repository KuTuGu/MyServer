const Router = require('koa-router'),
    RepoAutoSyn = require('../controller/github_subRepo_autoSyn');

const router = new Router();

router.post('/repo/autopull', RepoAutoSyn.getLatestRepo);

module.exports = router;