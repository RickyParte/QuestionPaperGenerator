const Question = require('../models/question.model');

exports.addQuestions = async (req, res) => {
    try {
        const question = req.body;
    
        if (!question.question || !question.subject || !question.topic || !question.difficulty || !question.marks) {
            return res.status(400).json({
                status: 'failed',
                success: false,
                data: ["Data is missing"]
            });
        }
    
        const existingQuestion = await Question.findOne({ question: question.question, difficulty: question.difficulty });
    
        if (!existingQuestion) {
            const saveQuestion = await Question.create(question);
            return res.status(200).json({
                status: 'success',
                success: true,
                data: saveQuestion
            });
        } else {
            return res.status(200).json({
                status: 'failed',
                success: false,
                data: "Question already exists in the database"
            });
        }
    
    } catch (error) {
        return res.status(400).json({
            status: 'failed',
            error: error.message
        });
    }
    
};