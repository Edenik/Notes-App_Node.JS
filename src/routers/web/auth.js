const express = require('express');
const router = express.Router();

//localhost:3000/auth

router.get('/login', (req, res) => {
    res.render('loginRegister', {
        title: 'Login',
        description: 'Sign into your account'
    })
})

router.get('/register', (req, res) => {
    res.render('loginRegister', {
        title: 'Register',
        description: 'Register new account'
    })
})

router.get('/user_profile', (req, res) => {
    res.render('user_profile' , {
        title: 'My profile',
        name: 'Eden',
        age:'25',
        location:'Tel Aviv',
        image : 'https://avatars2.githubusercontent.com/u/5072333?s=460&u=cf26adedf04c1023c99662e7a7c4d1f26b7a8ffd&v=4'
    })
});


router.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404'
    })
})


module.exports = router;
