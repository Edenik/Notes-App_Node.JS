const express = require('express');
const router = express.Router();



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

router.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404'
    })
})


module.exports = router;
