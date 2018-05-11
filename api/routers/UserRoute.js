const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../config/db');
const router = express.Router();

const UserController = require('../controllers/UserController');

const UploadFileUtil = require('../Util/UploadfileUtil');


router.post('/register', UserController.register);

router.post('/registerwithMail', UserController.registerWithMail);


router.get('/checkEmail/:email', UserController.checkEmail);
router.get('/checkExitsEmail/:email', UserController.checkExitsEmail);

router.put('/resetpassword', UserController.resetPasswordGmail);


router.post('/login', UserController.login);

// router.post('/upload', UploadFileUtil.uploadImgUserHandling);
router.post('/uploadcv', UploadFileUtil.uploadCVUserHandling);



router.route('/user/getall')
      .get(UserController.getAllUsers);

router.route('/user/gettop4')
      .get(UserController.getTop4Users);

router.route('/user/:id')
      .get(UserController.findUserById)
      

router.route('/user/editpoint')
      .put(UserController.editPointUser);

router.route('/user/editavatar')
      .put(UserController.editAvataUser);



router.route('/user/edit')
      .put(UserController.editUser);

router.put('/update', UserController.editUser);

// router.route('password/edit')
//       .put(UserController.updatePasswordUser);

router.use(UserController.checkToken);
router.get('/profile', UserController.getUserProfile);



module.exports = router;