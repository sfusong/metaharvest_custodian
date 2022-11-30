module.exports = app => {
    const assets = require("../controllers/asset.controller.js");
    var router = require("express").Router();

    router.post("/", assets.create);
    router.get("/", assets.findAll);

    app.use('/api/assets', router);
}