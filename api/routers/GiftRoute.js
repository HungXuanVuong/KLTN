const express = require('express');

const config = require('../config/db');
const router = express.Router();

const GiftController = require('../controllers/GiftController');


router.route('/allgift')
.get(GiftController.getAllGift)
.post(GiftController.insertGift);

router.route('/allgift/:id')
.get(GiftController.giftById)
.put(GiftController.editGift)
.delete(GiftController.deleteGift);

router.route('/getalltype/:type_giftID/allgift')
.get(GiftController.giftListByTypeofGift);

module.exports = router;