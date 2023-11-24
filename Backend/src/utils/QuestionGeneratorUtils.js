function generateQuestion(questionStore, difficulty, count, questionPaper, totalMarksLimit) {
    const difficultyQuestions = questionStore.filter(question => question.difficulty === difficulty);
    let questionCount = 0;
    let totalMarks = 0;

    while (questionCount < count && difficultyQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * difficultyQuestions.length);
        const selectedQuestion = difficultyQuestions.splice(randomIndex, 1)[0];

        // Check if adding the selected question exceeds the totalMarksLimit
        if (totalMarks + selectedQuestion.marks <= totalMarksLimit) {
            questionPaper.push(selectedQuestion);
            totalMarks += selectedQuestion.marks;
            // totalMarksLimit-=selectedQuestion.marks;
            questionCount++;

        }
    }
}
module.exports=generateQuestion;
