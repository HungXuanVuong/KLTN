const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../config/db');
const router = express.Router();

const UserController = require('../controllers/UserController');


router.post('/register', UserController.register);

router.post('/registerwithMail', UserController.registerWithMail);


router.get('/checkEmail/:email', UserController.checkEmail);
router.get('/checkExitsEmail/:email', UserController.checkExitsEmail);


router.post('/login', UserController.login);


router.route('/user/getall')
      .get(UserController.getAllUsers);

router.route('/user/gettop4')
      .get(UserController.getTop4Users);

router.route('/user/:id')
      .get(UserController.findUserById)
      .put(UserController.updatePasswordUser);

router.route('/edit')
      .put(UserController.updatePasswordUser);

router.use(UserController.checkToken);
router.get('/profile', UserController.getUserProfile);



module.exports = router;