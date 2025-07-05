const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/user.controller');


//create user
router.post('/', registerUser);



module.exports = router;
