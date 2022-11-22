const db = require("../models");
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if (!req.body.sender || !req.body.receiver || !req.body.amount || !req.body.asset) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Transaction
    const transaction = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        amount: req.body.amount,
        asset: req.body.asset,
        status: req.body.status,
        statusBg: req.body.statusBg,
        description: req.body.description,
        userId: req.body.userId
    };

    // Save Transaction in the database
    Transaction.create(transaction)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Transaction."
            });
        });
}

exports.createTransaction = (transaction) => {
    return Transaction.create(transaction)
    .then(data => {
        return data;
    })
    .catch(err => {
        return err;
    });
}