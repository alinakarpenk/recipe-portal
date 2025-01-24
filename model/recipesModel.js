const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/config_db')
const Category = require('./categoryModel')
const User = require('./user')


const Recipes = db.define('Recipes', {

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    describe:{
        type: DataTypes.TEXT
    },
   user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'recipes',
    timestamps: false
})

Recipes.belongsTo(Category, { foreignKey: 'category_id' });
Recipes.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Recipes