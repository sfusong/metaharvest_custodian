const db = require("../models");
const Wallet = db.wallets;
const Asset = db.assets;
const Op = db.Sequelize.Op;
const authJwt = require("../middleware/authJwt");


// Create and Save a new Wallet
exports.create = (req, res) => {
    // Validate request
    if (!req.body.address) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }

    // Create a Wallet
    const wallet = {
        name: req.body.name,
        image: req.body.image,
        amount: req.body.amount,
        status: req.body.status,
        statusBg: req.body.statusBg,
        description: req.body.description,
        userId: req.body.userId
    };

    // Save Wallet in the database
    Wallet.create(wallet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Wallet."
            });
        });
}

exports.findAllByUserId = async (req, res) => {
    const token = req.headers.authorization;

    authJwt.verifyToken(token).then((data) => {
        const userId = data.id;


        Wallet.findAll({
            where: {
                userId: userId
            },
            include: ["asset"]
        })
            .then(data => {
                let tabSet = new Set();
                let rawWallets = data;

                rawWallets.forEach((wallet, i) => {
                    tabSet.add(wallet.asset.id);
                });

                let tabArray = Array.from(tabSet);

                let tabs = tabArray.map(async (tabId) => {

                    a = await Asset.findByPk(tabId, {
                        raw: true
                    }).then((data) => {
                        return data;
                    }).catch((err) => {
                        console.log(err);
                    });

                    return {
                        id: a.id,
                        tabTitle: a.symbol,
                        image: a.image
                    }
                });

                Promise.all(tabs).then((tabsData) => {

                    let wallets = tabArray.map(async (tabId) => {
                        w = await Wallet.findAll({
                            raw: true,
                            where: {
                                userId: userId,
                                assetId: tabId,
                            },
                            include: ["vault"]
                        }).then((data) => {
                            return data;
                        }).catch((err) => {
                            console.log(err);
                        });
                        return w;
                    });

                    Promise.all(wallets).then((walletsData) => {

                        let source = []

                        walletsData.forEach((item) => {
                            let assetData = item.map((wallet) => {
                                return {
                                    AccountImage: wallet["vault.image"],
                                    Name: wallet["vault.name"],
                                    amount: wallet.amount
                                }
                            })
                            source.push(assetData)
                        })

                        let result = {
                            tabs: tabsData,
                            source: source
                        }

                        res.send(result)
                    });
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Wallets."
                });
            });
    }).catch((err) => {
        console.log(err);
    }
    );
}


// get wallets by AssetId
exports.getWalletsByAssetId = (req, res) => {
    const token = req.headers.authorization;
    const assetArray = req.body.assetArray;

    res.send(assetArray);
}

exports.createWallet = (wallet) => {
    return Wallet.create(wallet)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}