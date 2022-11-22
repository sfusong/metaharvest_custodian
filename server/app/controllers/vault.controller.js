const { wallets } = require("../models");
const db = require("../models");
const Vault = db.vaults;
const Wallet = db.wallets;
const Op = db.Sequelize.Op;

// Create and Save a new Vault
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }

    // Create a Vault
    const vault = {
        name: req.body.name,
        image: req.body.image,
        amount: req.body.amount,
        status: req.body.status,
        statusBg: req.body.statusBg,
        description: req.body.description,
        userId: req.body.userId
    };

    // Save Vault in the database
    Vault.create(vault)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vault."
            });
        });
};

// Retrieve all Vaults from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Vault.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving vaults."
        });
    });
}

// Find a single Vault with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Vault.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Not found Vault with id " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vault with id=" + id
            });
        });
}

//Find a singer Vault with an id with wallets
exports.findOneWithWallets = (req, res) => {
    const id = req.params.id;

    Vault.findByPk(id, { include: ["wallets"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Not found Vault with id " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vault with id=" + id
            });
        });
}

//Find all Vaults with Wallets
exports.findAllWithWallets = (req, res) => {
    Vault.findAll({ include: ["wallets"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving vaults."
            });
        });
}



exports.createVault = (vault) => {
    return Vault.create(vault)
        .then(vault => {
            return vault;
        })
        .catch(err => {
            throw new Error(err);
        });
}
