module.exports = (sequelize, Sequelize) => {
    const Asset = sequelize.define("asset", {
        name: {
            type: Sequelize.STRING
        },
        symbol: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(10, 2)
        },
        image: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Asset;
};