const express = require('express');
const router = express.Router();
const { generateQuestionPaper, generateQuestionPaperBySubject } = require('../controllers/QuestionPaperGeneratorController');


router.route('/getquestionpaper').post(generateQuestionPaper);
router.route('/getquestionpaperbysubject').post(generateQuestionPaperBySubject);


module.exports = router;