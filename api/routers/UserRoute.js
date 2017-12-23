const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../config/db');
const router = express.Router();

const UserController = require('../controllers/UserController');


router.post('/register', UserController.register);


router.get('/checkEmail/:email', UserController.checkEmail);


router.post('/login', UserController.login);
router.use(UserController.checkToken);

router.route('/user/:id')
.get(UserController.findUserById)
.put(UserController.updatePasswordUser);

router.route('/edit')
.put(UserController.updatePasswordUser);

 router.get('/profile', UserController.getUserProfile);

module.exports = router;