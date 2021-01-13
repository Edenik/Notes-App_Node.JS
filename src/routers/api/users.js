const express = require('express');
const RandExp = require('randexp');
const validator = require('validator');

const router = express.Router();


router.post('/register', (req,res) => {
    const email = req.body.email;    
    const isValidEmail = validator.isEmail(email)
    if(!isValidEmail){
        res.send({isValidEmail, email })
    } else {
        res.send('Email is valid ' + email);
    }

});
router.get('/generatePassword', (req, res) => {

    /*
 * Passwords must be 
 * - At least 8 characters long, max length 12
 * - Include at least 1 lowercase letter
 * - 1 capital letter
 * - 1 number
 * - 1 special character => !@#$%^&*
    */

    const passRegex = new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,12}$/);
    const generatedPassword = new RandExp(passRegex).gen();

    res.send({ generatedPassword, length: generatedPassword.length })
});


module.exports = router;
