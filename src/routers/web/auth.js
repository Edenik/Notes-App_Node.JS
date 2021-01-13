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



module.exports = router;
