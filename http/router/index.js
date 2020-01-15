const RepoAutoSyn = require('../controller/github_subRepo_autoSyn');

module.exports = app => {
    app.post('/repo/autopull', RepoAutoSyn.getLatestRepo);
};