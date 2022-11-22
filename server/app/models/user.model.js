module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        label: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        }
    });

    return User;
};