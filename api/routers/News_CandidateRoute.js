const express = require('express');
const config = require('../config/db');
const router = express.Router();
const NewsCandidateController = require('../controllers/New_CandidateController');

router.route('/add')
.post(NewsCandidateController.addNew_Candidate);

router.route('/getall')
.get(NewsCandidateController.getAllNewsCandidate);

router.route('/get5newcandidate')
.get(NewsCandidateController.get5NewCandidate);

router.get('/checkEmailCandidate/:news/:email', NewsCandidateController.checkEmail);
router.get('/checkPhoneCandidate/:news/:phone', NewsCandidateController.checkPhone);

router.route('/findbystatus/:status')
.get(NewsCandidateController.countNewsCandidate);

router.route('/edit')
.put(NewsCandidateController.editNewsCandidate);

router.route('/findcandidateinnews/:id')
.put(NewsCandidateController.countCandidateInNewsByStatus);

router.route('/candidate/:id')
.get(NewsCandidateController.findListCandidateByIdNews);
router.route('/candidateuser/:id')
.get(NewsCandidateController.findListCandidateByIdUser);

router.route('/:id')
.get(NewsCandidateController.findNewsCandidateById)
.delete(NewsCandidateController.deleteNewsCandidate);

module.exports = router;