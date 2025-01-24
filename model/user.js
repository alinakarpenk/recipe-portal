const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/config_db')

const User = db.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true, 
        },
    },
    password:{
        type:DataTypes.STRING
    },
    password2:{
        type:DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps:false
})

module.exports = User
