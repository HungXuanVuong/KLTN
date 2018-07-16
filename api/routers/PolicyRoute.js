const express = require('express');
const router = express.Router();

const PolicyController = require('../controllers/PolicyController');

router.route('/getall')
.get(PolicyController.getAllPolicy);

router.route('/add')
.post(PolicyController.addPolicy);

router.route('/delete')
.delete(PolicyController.deletePolicy);

router.route('/:id')
.get(PolicyController.getSinglePolicy)
.put(PolicyController.editPolicy)
.delete(PolicyController.deletePolicy);



module.exports = router;