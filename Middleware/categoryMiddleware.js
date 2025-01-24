const Category = require('../model/categoryModel');

const categoryMiddleware = async (req, res, next) => {
    try {
        const regularCategories = await Category.findAll({
            where: { type: 'normal' },
            attributes: ['id', 'name']
        });
        const holidayCategories = await Category.findAll({
            where: { type: 'holidays' },
            attributes: ['id', 'name']
        });
        res.locals.regularCategories = regularCategories; 
        res.locals.holidayCategories = holidayCategories;
        next();
    } catch (error) {
        res.locals.regularCategories = []
        res.locals.holidayCategories = []
        next();
    }
}

module.exports = categoryMiddleware;
