const express = require('express');

const config = require('../config/db');
const router = express.Router();

const OrderController = require('../controllers/OrderController');

router.route('/add')
.post(OrderController.addOrder);

router.route('/getall')
.get(OrderController.getAllOrder);

router.route('/edit')
.put(OrderController.editOrder);

router.route('/editstatus')
.put(OrderController.editStatusAndDay);


router.route('/:id')
.get(OrderController.getOrderByID)
.delete(OrderController.deleteOrder);

module.exports = router;