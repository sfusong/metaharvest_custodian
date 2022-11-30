const { vaults } = require("../models");
const db = require("../models");
const User = db.users;
const Vault = db.vaults;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const authJwt = require("../middleware/authJwt");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        label: req.body.label,
        image: req.body.image,
        status: req.body.status,
        role: req.body.role
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOneWithVaults = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, { include: ["vaults"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
}

exports.createUser = (user) => {
    return User.create(user)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
};

exports.login = (req, res) => {
    const { username, password } = req.body;


    User.findOne({ where: { username: username } })
        .then(data => {
            console.log(data);
            if (data) {
                bcrypt.compare(password, data.password, function (err, result) {
                    if (result) {
                        const token = authJwt.createToken({ id: data.id });
                        res.status(200).send({
                            data: data,
                            token: token
                        });
                    } else {
                        res.status(401).send({
                            message: "Invalid Password!"
                        });
                    }
                });
            } else {
                res.status(404).send({
                    message: `Cannot find User with username=${username}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with username=" + username
            });
        });
}

exports.checkLoginStatus = (req, res) => {
    console.log(req.session);
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.send({ message: 'not logged in' });
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.send({ message: 'logged out' });
}

exports.register = (req, res) => { }

