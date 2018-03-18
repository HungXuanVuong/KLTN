const express = require('express');

const config = require('../config/db');
const router = express.Router();

const GiftController = require('../controllers/GiftController');


router.route('/all')
.get(GiftController.getAllGift)
.post(GiftController.themGift);

module.exports = router;