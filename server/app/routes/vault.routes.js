module.exports = app => {
    const vaults = require("../controllers/vault.controller.js");
    var router = require("express").Router();
    
    router.post("/", vaults.create);
    router.get("/", vaults.findAllWithWallets);
    router.get("/:id", vaults.findOneWithWallets);
    router.get("/withWallets/:id", vaults.findOneWithWallets);
    router.get("/withWallets", vaults.findAllWithWallets);

    app.use('/api/vaults', router);
}

