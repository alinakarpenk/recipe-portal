const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/config_db');
const Recipes = require('./recipesModel');
const User = require('./user')
const Favourite = db.define('Favourite',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }

}, {
    tableName: 'favourite',
    timestamps: false
})

Favourite.belongsTo(User, { foreignKey: 'user_id' });
Favourite.belongsTo(Recipes, { foreignKey: 'recipes_id' });


module.exports = Favourite