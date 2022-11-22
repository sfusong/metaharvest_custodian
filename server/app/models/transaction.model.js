module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        txType: {
            type: Sequelize.STRING
        },
        txId: {
            type: Sequelize.STRING
        },
        txHash: {
            type: Sequelize.STRING
        },
        txStatus: {
            type: Sequelize.STRING
        },
        fee: {
            type: Sequelize.DECIMAL(10, 4)
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2)
        },
        senderId: {
            type: Sequelize.INTEGER
        },
        senderName: {
            type: Sequelize.STRING
        },
        receiverId: {
            type: Sequelize.INTEGER
        },
        receiverName: {
            type: Sequelize.STRING
        },
        fromVaultId: {
            type: Sequelize.INTEGER
        },
        fromVaultName: {
            type: Sequelize.STRING
        },
        toVaultId: {
            type: Sequelize.INTEGER
        },
        toVaultName: {
            type: Sequelize.STRING
        },
        fromWalletId: {
            type: Sequelize.INTEGER
        },
        fromAddress: {
            type: Sequelize.STRING
        },
        toWalletId: {
            type: Sequelize.INTEGER
        },
        toAddress: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2)
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
        sign: {
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
        },
        aml: {
            type: Sequelize.STRING
        }
    });
    return Transaction;
};