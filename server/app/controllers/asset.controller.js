const db = require("../models");
const Asset = db.assets;
const Op = db.Sequelize.Op;

// Create and Save a new Asset
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Asset
    const asset = {
        name: req.body.name,
        fullName: req.body.fullName,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,

    };
    
    // Save Asset in the database
    Asset.create(asset)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Asset."
        });
        });
    }

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    
    Asset.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving assets."
        });
    });
}




//create Asset Without rountes.
exports.createAsset = (asset) => {
    return Asset.create(asset)
    .then(asset => {
        return asset;
    })
    .catch(err => {
        throw new Error(err);
    });
}
