const db = require("./app/models");
const userController = require("./app/controllers/user.controller");
const assetController = require("./app/controllers/asset.controller");
const vaultController = require("./app/controllers/vault.controller");
const walletController = require("./app/controllers/wallet.controller");
const whitelistController = require("./app/controllers/whitelist.controller");
const transactionController = require("./app/controllers/transaction.controller");

const run = async () => {
    const user1 = await userController.createUser({
        username: "user1",
        password: "$2b$10$.wjul86Iqdkt/siWXdJM9OwmZwe5erVXElkDpHOtRj9DihT95AX3y",
        name: "Cristiano Ronaldo dos Santos Aveiro",
        firstName: "Cristiano",
        lastName: "Ronaldo",
        email: "cris@jsfund.cn",
        label: "CR7",
        image: "avatar/ronaldo.jpeg",
        status: "active",
        role: "Customer"
    });
    const user2 = await userController.createUser({
        username: "user2",
        password: "$2b$10$QxT.jJxFzTiMfCXfOMGZJ.QNGcJeGiLZbz9prIX9f5S93RP/1wmzW",
        name: "Liniel Messi Cuccittini",
        firstName: "Liniel",
        lastName: "Messi",
        email: "messi@jsfund.cn",
        label: "LM10",
        image: "avatar/messi.jpeg",
        status: "active",
        role: "Customer"
    });
    const user3 = await userController.createUser({
        username: "user3",
        password: "$2b$10$QOMWoXQXzspbGnEPuRgz7OJIVSVnokMw0BvFOkF/EPxUJCzmC1ppO",
        name: "Neymar da Silva Santos Júnior",
        firstName: "Neymar",
        lastName: "Júnior",
        email: "neymar@jsfund.cn",
        label: "NJR",
        image: "avatar/neymar.jpeg",
        status: "active",
        role: "Customer"
    });
    const user4 = await userController.createUser({
        username: "user4",
        password: "$2b$10$hYHilnDFPPS8akJFJZ1GUe5x0R/cXCjXJX7hXH1e9E3JGHN.YTRc6",
        name: "Kylian Mbappé Lottin",
        firstName: "Kylian",
        lastName: "Mbappé",
        email: "mbappe@jsfund.cn",
        label: "KMB",
        image: "avatar/mbappe.jpg",
        status: "active",
        role: "Customer"
    });
    const user5 = await userController.createUser({
        username: "user5",
        password: "$2b$10$9oRHLsYOs5qiqjzQ3sO5G.bgkZGR0XUmrh6hOBOQ4/.TE/08CQJjK",
        name: "Kevin De Bruyne",
        firstName: "Kevin",
        lastName: "De Bruyne",
        email: "deBruyne@jsfund.cn",
        label: "KDB",
        image: "avatar/deBruyne.jpeg",
        status: "active",
        role: "Customer"
    });


    const asset1 = await assetController.createAsset({
        name: "Bitcoin",
        symbol: "BTC",
        image: "asset/bitcoin.png",
        status: "active",
        price: 10000.23,
        description: "Bitcoin is a cryptocurrency invented in 2008"
    });

    const asset2 = await assetController.createAsset({
        name: "Ethereum",
        symbol: "ETH",
        image: "asset/ethereum.png",
        status: "active",
        price: 1000.23,
        description: "Ethereum is an open-source, public, blockchain-based distributed computing platform"
    });

    const asset3 = await assetController.createAsset({
        name: "Litecoin",
        symbol: "LTC",
        image: "asset/litecoin.png",
        status: "active",
        price: 100.23,
        description: "Litecoin is a peer-to-peer cryptocurrency"
    });

    const asset4 = await assetController.createAsset({
        name: "Ripple",
        symbol: "XRP",
        image: "asset/xrp.png",
        status: "active",
        price: 10.23,
        description: "Ripple is a real-time gross settlement system (RTGS)..."
    });

    const vault1_1 = await vaultController.createVault({
        name: "CR7's Quant Vault",
        image: "vault/vault_1_1.png",
        amount: 1000,
        status: "active",
        statusBg: "#00FF00",
        description: "CR7's Quant Vault",
        userId: user1.id
    });

    const vault1_2 = await vaultController.createVault({
        name: "CR7's AutoCall Vault",
        image: "vault/vault_1_1.png",
        amount: 2000,
        status: "active",
        statusBg: "#00FF00",
        description: "CR7's AutoCall Vault",
        userId: user1.id
    });

    const vault2_1 = await vaultController.createVault({
        name: "LM10's Quant Vault",
        image: "vault/vault_1_1.png",
        amount: 3000,
        status: "active",
        statusBg: "#00FF00",
        description: "LM10's Quant Vault",
        userId: user2.id
    });

    const vault2_2 = await vaultController.createVault({
        name: "LM10's AutoCall Vault",
        image: "vault/vault_1_1.png",
        amount: 200,
        status: "active",
        statusBg: "#00FF00",
        description: "LM10's AutoCall Vault",
        userId: user2.id
    });

    const vault3_1 = await vaultController.createVault({
        name: "NJR's Quant Vault",
        image: "vault/vault_1_1.png",
        amount: 5000,
        status: "active",
        statusBg: "#00FF00",
        description: "NJR's Quant Vault",
        userId: user3.id
    });

    const wallet1_1_1 = await walletController.createWallet({
        name: "CR7's Bitcoin Wallet in Quant Vault",
        address: "0x5a52e96bacdabb82fd05763e25335261b270efcb",
        assetName: "Bitcoin",
        assetSymbol: "BTC",
        amount: 1000,
        status: "active",
        assetId: asset1.id,
        vaultId: vault1_1.id,
        vaultName: vault1_1.name,
        userId: user1.id,
        userName: user1.name
    });

    const wallet1_1_2 = await walletController.createWallet({
        name: "CR7's Ethereum Wallet in Quant Vault",
        address: "0xda9dfa130df4de4673b89022ee50ff26f6ea73cf",
        assetName: "Ethereum",
        assetSymbol: "ETH",
        amount: 1000,
        status: "active",
        assetId: asset2.id,
        vaultId: vault1_1.id,
        vaultName: vault1_1.name,
        userId: user1.id,
        userName: user1.name
    });

    const wallet1_1_3 = await walletController.createWallet({
        name: "CR7's Litecoin Wallet in Quant Vault",
        address: "0x5a52e96bacdabb82fd05763e25335261b270efcb",
        assetName: "Litecoin",
        assetSymbol: "LTC",
        amount: 1000,
        status: "active",
        assetId: asset3.id,
        vaultId: vault1_1.id,
        vaultName: vault1_1.name,
        userId: user1.id,
        userName: user1.name
    });

    const wallet1_1_4 = await walletController.createWallet({
        name: "CR7's Ripple Wallet in Quant Vault",
        address: "0xdcef968d416a41cdac0ed8702fac8128a64241a2",
        assetName: "Ripple",
        assetSymbol: "XRP",
        amount: 1000,
        status: "active",
        assetId: asset4.id,
        vaultId: vault1_1.id,
        vaultName: vault1_1.name,
        userId: user1.id,
        userName: user1.name
    });

    const wallet1_2_1 = await walletController.createWallet({
        name: "CR7's Bitcoin Wallet in AutoCall Vault",
        address: "0x5a52e96bacdabb82fd05763e25335261b270efcb",
        assetName: "Bitcoin",
        assetSymbol: "BTC",
        amount: 1000,
        status: "active",
        assetId: asset1.id,
        vaultId: vault1_2.id,
        vaultName: vault1_2.name,
        userId: user1.id,
        userName: user1.name
    });

    const wallet1_2_2 = await walletController.createWallet({
        name: "CR7's Ethereum Wallet in AutoCall Vault",
        address: "3da9dfa130df4de4673b89022ee50ff26f6ea73cf",
        assetName: "Ethereum",
        assetSymbol: "ETH",
        amount: 1000,
        status: "active",
        assetId: asset2.id,
        vaultId: vault1_2.id,
        vaultName: vault1_2.name,
        userId: user1.id,
        userName: user1.name
    });

    const wallet2_1_1 = await walletController.createWallet({
        name: "LM10's Bitcoin Wallet in Quant Vault",
        address: "4a52e96bacdabb82fd05763e25335261b270efcb",
        assetName: "Bitcoin",
        assetSymbol: "BTC",
        amount: 1000,
        status: "active",
        assetId: asset1.id,
        vaultId: vault2_1.id,
        vaultName: vault2_1.name,
        userId: user2.id,
        userName: user2.name
    });

    const wallet2_1_2 = await walletController.createWallet({
        name: "LM10's Ethereum Wallet in Quant Vault",
        address: "5da9dfa130df4de4673b89022ee50ff26f6ea73cf",
        assetName: "Ethereum",
        assetSymbol: "ETH",
        amount: 1000,
        status: "active",
        assetId: asset2.id,
        vaultId: vault2_1.id,
        vaultName: vault2_1.name,
        userId: user2.id,
        userName: user2.name
    });

    const whitelist1_to_2 = await whitelistController.createWhitelist({
        adminUserId: user1.id,
        adminUserName: user1.name,
        targetUserId: user2.id,
        targetUserName: user2.name,
        status: "active",
        statusBg: "#00FF00"
    });

    const whitelist1_to_3 = await whitelistController.createWhitelist({
        adminUserId: user1.id,
        adminUserName: user1.name,
        targetUserId: user3.id,
        targetUserName: user3.name,
        status: "pending",
        statusBg: "#00FF00"
    });

    const whitelist2_to_1 = await whitelistController.createWhitelist({
        adminUserId: user2.id,
        adminUserName: user2.name,
        targetUserId: user1.id,
        targetUserName: user1.name,
        status: "pending",
        statusBg: "#00FF00"
    });

    const whitelist1_to_4 = await whitelistController.createWhitelist({
        adminUserId: user1.id,
        adminUserName: user1.name,
        targetUserId: user4.id,
        targetUserName: user4.name,
        status: "invalid",
        statusBg: "#00FF00"
    });

    const transaction_from_1_1_1_to_2_1_1_asset_1 = await transactionController.createTransaction({
        txType: "Transfer",
        txId: "0x2562a1f91567",
        txHash: "0x3bbe99a6146ff79c25d6ba73667d84a327b8bb92da10ee50873ec4a6e454689e",
        txStatus: "pending",
        fee: 0.0001,
        amount: 100,
        senderId: user1.id,
        senderName: user1.name,
        receiverId: user2.id,
        receiverName: user2.name,
        fromVaultId: vault1_1.id,
        fromVaultName: vault1_1.name,
        toVaultId: vault2_1.id,
        toVaultName: vault2_1.name,
        fromWalletId: wallet1_1_1.id,
        fromAddress: wallet1_1_1.address,
        toWalletId: wallet2_1_1.id,
        toAddress: wallet2_1_1.address,
        assetId: asset1.id,
        assetName: asset1.name,
        assetSymbol: asset1.symbol,
        sign: "Cristiano",
        note: "Transfer from CR7's Bitcoin Wallet in Quant Vault to LM10's Bitcoin Wallet in Quant Vault",
        aml: "Pass"
    });

    const transaction_from_2_1_2_to_1_2_2_asset_2 = await transactionController.createTransaction({
        txType: "Transfer",
        txId: "0x2562a1f91568",
        txHash: "0x3bbe99a6146ff79c25d6ba73667d84a327b8bb92da10ee50873ec4a6e454689f",
        txStatus: "done",
        fee: 3.23,
        amount: 100,
        senderId: user2.id,
        senderName: user2.name,
        receiverId: user1.id,
        receiverName: user1.name,
        fromVaultId: vault2_1.id,
        fromVaultName: vault2_1.name,
        toVaultId: vault1_2.id,
        toVaultName: vault1_2.name,
        fromWalletId: wallet2_1_2.id,
        fromAddress: wallet2_1_2.address,
        toWalletId: wallet1_2_2.id,
        toAddress: wallet1_2_2.address,
        assetId: asset2.id,
        assetName: asset2.name,
        assetSymbol: asset2.symbol,
        sign: "Lionel",
        note: "Transfer from LM10's Ethereum Wallet in Quant Vault to CR7's Ethereum Wallet in AutoCall Vault",
        aml: "Pass"
    });











};

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run();
});
console.log("Done!");
