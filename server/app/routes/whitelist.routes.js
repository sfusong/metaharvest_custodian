module.exports = app => {
    const whitelists = require("../controllers/whitelist.controller.js");
    var router = require("express").Router();

    // Create a new Whitelist
    router.post("/", whitelists.create);
    router.get("/", whitelists.findAllByAdminUserId);

    app.use('/api/whitelists', router);
};