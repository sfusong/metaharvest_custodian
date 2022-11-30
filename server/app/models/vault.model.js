module.exports = (sequelize, Sequelize) => {
    const Vault = sequelize.define("vault", {
        name: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2)
        },
        status: {
            type: Sequelize.STRING
        },
        statusBg: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        }
    });

    return Vault;
}