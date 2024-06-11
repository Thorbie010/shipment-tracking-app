const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('qc_logi', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

// Import the User model
const User = require('./User');

const Order = sequelize.define('Order', {
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    pickupAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Other options...
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Establish a relationship between User and Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

(async () => {
    try {
        await sequelize.sync();
        console.log('Order model synchronised with database.');
    } catch (error) {
        console.error('Error synchronising order model with database', error);
    }
})();

module.exports = Order;
