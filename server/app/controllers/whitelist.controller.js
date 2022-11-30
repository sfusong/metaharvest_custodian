const db = require("../models");
const Whitelist = db.whitelists;
const Op = db.Sequelize.Op;
const authJwt = require("../middleware/authJwt");

// Create and Save a new Whitelist
exports.create = (req, res) => {
    // Validate request
    if (!req.body.targetUser || !req.body.adminUser) {
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
    const token = req.headers.authorization;

    authJwt.verifyToken(token).then((data) => {
        const adminUserId = data.id;

        Whitelist.findAll({ where: { adminUserId: adminUserId }, include: ["targetUser"] })
            .then(rawWhitelistData => {

                let resultWhitelists = rawWhitelistData.map((whitelist) => {
                    let resultWhitelist = {
                        image: whitelist.targetUser.image,
                        id: whitelist.id,
                        name: whitelist.targetUserName,
                        status: whitelist.status,
                        statusBg: whitelist.status === 'active' ? 'green' : (whitelist.status === 'pending' ? 'orange' : 'red')
                    }
                    return resultWhitelist;
                })
                res.send(resultWhitelists);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving whitelists."
                });
            });
    }).catch((err) => {
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