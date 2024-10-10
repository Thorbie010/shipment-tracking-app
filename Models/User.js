const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('qc_logi', 'root', 'password',{
    host: 'localhost',
    dialect: 'mysql',
});

const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    photoname: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    }, {
      // Other options...
      timestamps: true,
      createdAt: false,
      updatedAt: false,
});

(async () => {
    try {
        await sequelize.sync();
        console.log('User model synchronised with database.');
    } catch (error) {
        console.error('Error synchronising user model with database', error);
    }
})();

module.exports = User;