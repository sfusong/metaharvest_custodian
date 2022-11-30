module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    
    router.post("/", users.create);
    router.get("/withVaults:id", users.findOneWithVaults);
    router.get("/", users.findAll);
    app.use('/api/users', router);
}