const express = require('express');

const config = require('../config/db');
const router = express.Router();

const NewsController = require('../controllers/NewsController');


router.route('/getall')
.get(NewsController.getAllNews);

router.route('/gettop6')
.get(NewsController.getTop6News);

router.route('/news/:id')
.get(NewsController.getSingleNews);

module.exports = router;