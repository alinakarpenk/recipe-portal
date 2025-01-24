const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Recipes = require('../model/recipesModel')

const generateToken = (userId) =>{
    const secretKey = '123456'
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' })
}

exports.GetLoginPage = (req,res) => {
    res.render('UserPage/login', {
        title: 'Увійти',
        layout: 'layouts/layout.hbs'
    });
}

exports.LoginUser = async (req,res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ where: { email } });
        if(!user || !(await bcrypt.compare(password, user.password))){
            console.log('incorrect email or password')
            return res.status(401).send('incorrect email or password')
        }

        const token = generateToken(user.id)

        res.cookie('authToken', token, { httpOnly: true, secure: false, maxAge: 3600000 }); // Додаємо maxAge
        console.log('Cookies:', req.cookies);
        res.redirect('/user/profile');

    } catch(error) {
        console.log('Error')
        res.status(500).send('server error')
    }
}

exports.RegisterPage = (req,res) => {
    res.render('UserPage/register', {
        title: 'Зареєструватися',
        layout: 'layouts/layout.hbs'
    });
}

exports.RegisterUser = async (req,res) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    try {
        const { name, email, password, password2 } = req.body
        if (!name || !email || !password || !password2) {
            console.log('empty input')
            return res.status(400).send('empty input')
        }
        if (!emailRegex.test(email)) {
            console.log('invalid email')
            return res.status(400).send('invalid email')
            
        }
        if (password !== password2) {
            console.log('password !match')
            return res.status(400).send('password !match')   
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const registerUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.redirect('/user/login')
    } catch (error) {
        console.log('server error')
        res.status(500).semd('server error')
    }
}

exports.GetUserProfile = async (req,res) => {
    try {
        if (!req.user) {
            console.log('user not found');
            return res.status(401).redirect('/user/login')
        }
        const user = await User.findByPk(req.user.id); 
        if (!user) {
            console.log('user not found');
            return res.status(404)
        }
        const recipes = await Recipes.findAll({
            where: { user_id: req.user.id }, 
            attributes: ['id', 'name', 'describe', 'image'],
        });
        res.render('UserPage/profile', {
            title: 'Профіль',
            layout: 'layouts/layout.hbs',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            recipes
        });
    } catch (error) {
        res.status(500).send('server error')
    }
}

exports.UserLogout = (req,res) => {
    res.clearCookie('authToken')
    res.redirect('/')
}