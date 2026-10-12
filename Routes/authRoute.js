const express = require("express");
const signin = require('../Controllers/signinController');
const login = require('../Controllers/loginController');
const router = express.Router();

router.post('/signin',signin);
router.post('/login',login);

module.exports = router;