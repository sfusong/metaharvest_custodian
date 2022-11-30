module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
    var router = require("express").Router();

    // Create a new Transaction
    router.post("/", transactions.create);
    router.get("/", transactions.findAllByUserId);

    app.use('/api/transactions', router);
};