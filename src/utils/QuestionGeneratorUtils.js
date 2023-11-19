function generateQuestion(questionStore, difficulty, count, questionPaper, totalMarksLimit) {
    const difficultyQuestions = questionStore.filter(question => question.difficulty === difficulty);
    let i = 0;
    let totalMarks = 0;
    
    while (i < count && difficultyQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * difficultyQuestions.length);
        const selectedQuestion = difficultyQuestions.splice(randomIndex, 1)[0];
        
        // Check if adding the selected question exceeds the totalMarksLimit
        if (totalMarks + selectedQuestion.marks <= totalMarksLimit) {
            questionPaper.push(selectedQuestion);
            totalMarks += selectedQuestion.marks;
            // totalMarksLimit-=selectedQuestion.marks;
            i++;
            
        } 
    }
}
module.exports=generateQuestion;
