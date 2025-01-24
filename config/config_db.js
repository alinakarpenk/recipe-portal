const { Sequelize } = require('sequelize');


const db = new Sequelize(
    'recipes_db',
    'root',
    '111111',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);



module.exports = db 
