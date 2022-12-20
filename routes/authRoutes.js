const express = require("express");
const {check} = require("express-validator");
const router = express.Router();
const { signup } = require('../controllers/signup.controller')

router.post('/signup',[
    check('email','Invalid Email').isEmail(),
    check('password', 'Password less than 5 letters').isLength({min: 5})
],signup);


module.exports = router;