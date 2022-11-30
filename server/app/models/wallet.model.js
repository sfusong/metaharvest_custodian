module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("wallet", {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        assetId: {
            type: Sequelize.INTEGER
        },
        assetName: {
            type: Sequelize.STRING
        },
        assetSymbol: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2)
        },
        image: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        vaultId: {
            type: Sequelize.INTEGER
        },
        vaultName: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        userName: {
            type: Sequelize.STRING
        }
    });
    return Wallet;
};