const express = require('express');

const config = require('../config/db');
const router = express.Router();

const NewsUserController = require('../controllers/News_UserController');

router.route('/add')
.post(NewsUserController.addNews_User);

router.route('/getall')
.get(NewsUserController.getAllNewsUser);


router.route('/edit')
.put(NewsUserController.editNewsUser);

router.route('/user/:id')
.get(NewsUserController.findListUserByIdNews);

router.route('/:id')
.get(NewsUserController.findNewsUserById)
.delete(NewsUserController.deleteNewsUser);

module.exports = router;