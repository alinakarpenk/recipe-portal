const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/config_db')

const Category = db.define('Category',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    type:{
        type: DataTypes.STRING
    }
},

    {
        tableName: 'categories',
        timestamps: false
    })

module.exports = Category