exports.GetMainPage = (req,res) => {
    res.render('MainPage/main', {
        title: 'Головна сторінка',
        layout: 'layouts/layout.hbs',
        isAuthenticated: res.locals.isAuthenticated
    })
}