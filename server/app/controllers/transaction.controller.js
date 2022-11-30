const db = require("../models");
const Transaction = db.transactions;
const Op = db.Sequelize.Op;
const authJwt = require("../middleware/authJwt");


// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if (!req.body.sender || !req.body.receiver || !req.body.amount || !req.body.asset) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Transaction
    const transaction = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        amount: req.body.amount,
        asset: req.body.asset,
        status: req.body.status,
        statusBg: req.body.statusBg,
        description: req.body.description,
        userId: req.body.userId
    };

    // Save Transaction in the database
    Transaction.create(transaction)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Transaction."
            });
        });
}

// find all transactions by userId
exports.findAllByUserId = (req, res) => {
    const token = req.headers.authorization;

    authJwt.verifyToken(token).then((data) => {
        const userId = parseInt(data.id);

        Transaction.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            include: ["sender", "receiver", "asset"]
        })
            .then(rawTransactionData => {

                let resultTransactionData = rawTransactionData.map((Tx) => {
                    return createData(Tx.senderId, Tx.receiverId, Tx.amount, Tx.assetId, Tx.txStatus, (Tx.txStatus === 'active' ? 'green' : (Tx.txStatus === 'pending' ? 'orange' : 'red')), Tx.createdAt,
                        Tx.txType, Tx.toAddress, Tx.txHash, Tx.txId, Tx.fee, Tx.updatedAt, Tx.sign, Tx.aml, Tx.note, Tx.sender.image, Tx.receiver.image, Tx.asset.image);
                });

                res.send(resultTransactionData);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving transactions."
                });
            });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transactions."
        });
    });
}

exports.createTransaction = (transaction) => {
    return Transaction.create(transaction)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}

function createData(source, destination, amount, asset, status, statusBg, createdAt, type, destAddr, txHash, txId, networkFee, update, signed, aml, note, senderImage, receiverImage, assetImage) {
    return {
        source,
        destination,
        amount,
        asset,
        status,
        statusBg,
        createdAt,
        senderImage,
        receiverImage,
        assetImage,
        history: [
            {
                Type: type,
                DestAddr: destAddr,
                TxHash: txHash,
                TxID: txId,
                NetworkFee: networkFee,
                Amount: amount,
                Update: update,
                Signed: signed,
                AML: aml,
                Note: note
            },
        ],
    };
}