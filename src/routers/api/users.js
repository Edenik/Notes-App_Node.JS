const express = require('express');
const RandExp = require('randexp');

const router = express.Router();

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
