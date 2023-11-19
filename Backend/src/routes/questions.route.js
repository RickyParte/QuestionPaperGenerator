const express = require('express');
const router = express.Router();
const { addQuestions } = require('../controllers/QuestionController');


router.route('/add-question').post(addQuestions);


module.exports = router;