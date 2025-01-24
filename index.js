const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const authenticateToken = require('./Middleware/authMiddleware')
const categoryMiddleware = require('./Middleware/categoryMiddleware')
const methodOverride = require('method-override');


const port = 3000


const mainRoutes = require('./routes/main')
const userRoutes = require('./routes/user')
const recipesRoutes = require('./routes/recipes')
const favouriteRoutes = require('./routes/favourite-recipes')
const categoryRoutes = require('./routes/category')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(authenticateToken)


app.use(categoryMiddleware)


app.use('/', mainRoutes)
app.use('/user', userRoutes)
app.use('/recipes', recipesRoutes)
app.use('/page', favouriteRoutes)
app.use('/category', categoryRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})