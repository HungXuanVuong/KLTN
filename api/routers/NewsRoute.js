const express = require('express');

const config = require('../config/db');
const router = express.Router();

const NewsController = require('../controllers/NewsController');


router.route('/getall')
.get(NewsController.getAllNews);

module.exports = router;