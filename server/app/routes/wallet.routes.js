module.exports = app => {
    const wallets = require("../controllers/wallet.controller.js");
    var router = require("express").Router();
    // Create a new Wallet
    router.post("/", wallets.create);
    router.get("/", wallets.findAllByUserId);
    router.post("/getWalletsByAssetId", wallets.getWalletsByAssetId);
    
    app.use('/api/wallets', router);
}