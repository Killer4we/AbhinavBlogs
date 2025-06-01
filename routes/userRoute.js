const express = require('express');
const router = express.Router();

const {login,signup,delUser} = require('../controllers/userController');

router.post('/login',login);
router.post('/signup',signup);
router.delete('/delete/:id',delUser);

module.exports = router;

