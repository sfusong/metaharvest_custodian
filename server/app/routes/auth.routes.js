module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    
    router.post("/login", users.login);
    router.get("/login", users.checkLoginStatus);
    router.post("/register", users.register);

    app.use('/api/auth', router);
}