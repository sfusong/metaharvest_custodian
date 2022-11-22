const db = require("../models");
const Whitelist = db.whitelists;
const Op = db.Sequelize.Op;

// Create and Save a new Whitelist
exports.create = (req, res) => {
    // Validate request
    if (!req.body.targetUser||!req.body.adminUser) {
        res.status(400).send({
            message: "user can not be empty!"
        });
        return;
    }

    // Create a Whitelist
    const whitelist = {
        targetUser: req.body.targetUser,
        targetId: req.body.targetId,
        adminUser: req.body.adminUser,
        adminId: req.body.adminId,
        status: req.body.status,
    };

    // Save Whitelist in the database
    Whitelist.create(whitelist)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Whitelist."
            });
        });
};

// find all targetUser by adminUserId
exports.findAllByAdminUserId = (req, res) => {
    const adminUserId = req.query.adminUserId;
    console.log(adminUserId);
    var condition = adminUserId ? { adminUserId: { [Op.like]: `%${adminUserId}%` } } : null;

    Whitelist.findAll({ where: condition, include: ["targetUser"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving whitelists."
            });
        });
};




exports.createWhitelist = (whitelist) => {
    return Whitelist.create(whitelist)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}