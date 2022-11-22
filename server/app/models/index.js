const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

db.users = require("./user.model.js")(sequelize, Sequelize);
db.assets = require("./asset.model.js")(sequelize, Sequelize);
db.vaults = require("./vault.model.js")(sequelize, Sequelize);
db.whitelists = require("./whitelist.model.js")(sequelize, Sequelize);
db.transactions = require("./transaction.model.js")(sequelize, Sequelize);
db.wallets = require("./wallet.model.js")(sequelize, Sequelize);

db.users.hasMany(db.vaults, { as: "vaults" });
db.vaults.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.whitelists.belongsTo(db.users, {
  foreignKey: "adminUserId",
  as: "adminUser",
});

db.whitelists.belongsTo(db.users, {
  foreignKey: "targetUserId",
  as: "targetUser",
});


//wallet constraints
db.vaults.hasMany(db.wallets, { as: "wallets" });
db.wallets.belongsTo(db.vaults, {
  foreignKey: "vaultId",
  as: "vault",
});

db.users.hasMany(db.wallets, { as: "wallets" });
db.wallets.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.wallets.belongsTo(db.assets, { 
  foreignKey: "assetId",
  as: "asset",
});

//transactions constraints
db.transactions.belongsTo(db.users, {
  foreignKey: "senderId",
  as: "userfrom",
});
db.transactions.belongsTo(db.users, {
  foreignKey: "receiverId",
  as: "userTo",
});

db.transactions.belongsTo(db.vaults, {
  foreignKey: "fromVaultId",
  as: "valutFrom",
});
db.transactions.belongsTo(db.vaults, {
  foreignKey: "toVaultId",
  as: "valutTo",
});

db.transactions.belongsTo(db.wallets, {
  foreignKey: "fromWalletId",
  as: "walletFrom",
});
db.transactions.belongsTo(db.wallets, {
  foreignKey: "toWalletId",
  as: "walletTo",
});
db.transactions.belongsTo(db.assets, {
  foreignKey: "assetId",
  as: "asset",
});


module.exports = db;
