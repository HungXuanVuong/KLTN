const express = require('express');

const config = require('../config/db');
const router = express.Router();

const CandidateController = require('../controllers/CandidateController');


router.route('/add')
.post(CandidateController.addCandidate);

// router.route('/add/:id')
// .post(CandidateController.addCandidate);

router.route('/getall')
.get(CandidateController.getAllCandidate);


router.route('/edit')
.put(CandidateController.editCandidate);

router.route('/:id')
.get(CandidateController.findCandidateById)
.delete(CandidateController.deleteCandidate);

module.exports = router;