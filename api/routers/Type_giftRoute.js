const express = require('express');

const config = require('../config/db');
const router = express.Router();

const Type_giftController = require('../controllers/Type_giftController');


router.route('/getalltype')
.get(Type_giftController.getAllTypeGift)
.post(Type_giftController.insertTypeGift);

router.route('/getalltype/:id')
.get(Type_giftController.typeGiftById)
.put(Type_giftController.editTypeGift)
.delete(Type_giftController.deleteTypeGift);

module.exports = router;