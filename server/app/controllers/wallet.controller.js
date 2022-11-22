const db = require("../models");
const Wallet = db.wallets;
const Op = db.Sequelize.Op;

// Create and Save a new Wallet
exports.create = (req, res) => {
    // Validate request
    if (!req.body.address ) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }

    // Create a Wallet
    const wallet = {
        name: req.body.name,
        image: req.body.image,
        amount: req.body.amount,
        status: req.body.status,
        statusBg: req.body.statusBg,
        description: req.body.description,
        userId: req.body.userId
    };

    // Save Wallet in the database
    Wallet.create(wallet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Wallet."
            });
        });
}

exports.createWallet = (wallet) => {
    return Wallet.create(wallet)
    .then(data => {
        return data;
    })
    .catch(err => {
        return err;
    });
}