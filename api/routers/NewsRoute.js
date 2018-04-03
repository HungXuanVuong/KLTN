const express = require('express');

const config = require('../config/db');
const router = express.Router();

const NewsController = require('../controllers/NewsController');

router.route('/add')
.post(NewsController.addNews);

router.route('/getall')
.get(NewsController.getAllNews);

router.route('/gettop6')
.get(NewsController.getTop6News);

router.route('/edit')
.put(NewsController.editNews);

router.route('/:id')
.get(NewsController.getSingleNews)
.delete(NewsController.deleteNews);

module.exports = router;