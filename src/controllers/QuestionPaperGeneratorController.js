const Question = require("../models/question.model");
const constant = require("../constants/constants");
const generateQuestion = require("../utils/QuestionGeneratorUtils")

exports.generateQuestionPaper = async (req, res) => {
    try {
        // get Request body 
        const { subject, difficulty, totalMarks } = req.body;

        // check req field is not coming
        if (!difficulty || !totalMarks) {
            res.status(400).json({
                data: "Please provide values for subject, difficulty, and totalMarks",
            });
        }

        // calculate total easy,medium,hard questions 
        const totalEasyQuestions = totalMarks / constant.EASY_MARKS;
        const totalMediumQuestion = totalMarks / constant.MEDIUM_MARKS;
        const totalHardQuestions = totalMarks / constant.HARD_MARKS;

        // calculate number of question from difficulty percentage
        const easyQuestion = Math.floor(totalEasyQuestions * (difficulty.Easy / 100));
        const mediumQuestion = Math.floor(totalMediumQuestion * (difficulty.Medium / 100));
        const hardQuestion = Math.floor(totalHardQuestions * (difficulty.Hard / 100));

        // retrieve data from DB
        const questionStore = await Question.find({});
        const questionPaper = [];

        // number of questions total 
        const getTotal = (easyQuestion * constant.EASY_MARKS) + (mediumQuestion * constant.MEDIUM_MARKS) + (hardQuestion * constant.HARD_MARKS);

        // matching the number of total and totalMarks come from request
        if (getTotal != totalMarks) {
            res.status(400).json(({
                status: "Failed",
                success: false,
                data: "Please Check Percentage Of Difficulty There is an Issue with Difficulty Percentage to Generate QP",
                error: ["difficulty level marks", { Easy: constant.EASY_MARKS, Medium: constant.MEDIUM_MARKS, Hard: constant.HARD_MARKS }]
            }))
        }
        else {
            generateQuestion(questionStore, "Easy", easyQuestion, questionPaper, totalMarks);
            generateQuestion(questionStore, "Medium", mediumQuestion, questionPaper, totalMarks - easyQuestion * constant.EASY_MARKS);
            generateQuestion(questionStore, "Hard", hardQuestion, questionPaper, totalMarks - ((mediumQuestion * constant.MEDIUM_MARKS) + (easyQuestion * constant.EASY_MARKS)));

            res.status(200).json({
                status: "success",
                success: true,
                data: questionPaper,
            })
        }


    } catch (error) {
        res.status(500).json({
            status: 'failed',
            errror: "Internal Server Errror"
        });
    }
};

exports.generateQuestionPaperBySubject = async (req, res) => {
    try {
        // get Request body 
        const { subject, difficulty, totalMarks } = req.body;

        // check req field is not coming
        if (!subject || !difficulty || !totalMarks) {
            res.status(400).json({
                data: "Please provide values for subject, difficulty, and totalMarks",
            });
        }

        // calculate total easy,medium,hard questions 
        const totalEasyQuestions = totalMarks / constant.EASY_MARKS;
        const totalMediumQuestion = totalMarks / constant.MEDIUM_MARKS;
        const totalHardQuestions = totalMarks / constant.HARD_MARKS;

        // calculate number of question from difficulty percentage
        const easyQuestion = totalEasyQuestions * (difficulty.Easy / 100);
        const mediumQuestion = totalMediumQuestion * (difficulty.Medium / 100);
        const hardQuestion = Math.floor(totalHardQuestions * (difficulty.Hard / 100));

        // get Data from DB
        const questionStore = await Question.find({ subject });
        const questionPaper = [];

        // number of questions total 
        const getTotal = (easyQuestion * constant.EASY_MARKS) + (mediumQuestion * constant.MEDIUM_MARKS) + (hardQuestion * constant.HARD_MARKS);

        // matching the number of total and totalMarks come from request
        if (getTotal != totalMarks) {
            res.status(400).json(({
                data: "Please Check Percentage Of Difficulty There is an Issue with Difficulty Percentage to Generate QP",
                error: ["difficulty level marks", { Easy: constant.EASY_MARKS, Medium: constant.MEDIUM_MARKS, Hard: constant.HARD_MARKS }]
            }))
        }
        else {
            generateQuestion(questionStore, "Easy", easyQuestion, questionPaper, totalMarks);
            generateQuestion(questionStore, "Medium", mediumQuestion, questionPaper, totalMarks - easyQuestion * constant.EASY_MARKS);
            generateQuestion(questionStore, "Hard", hardQuestion, questionPaper, totalMarks - ((mediumQuestion * constant.MEDIUM_MARKS) + (easyQuestion * constant.EASY_MARKS)));

            res.status(200).json({
                status: "success",
                success: true,
                data: questionPaper,
            })
        }


    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error: "Internal Server Error"
        });
    }
};