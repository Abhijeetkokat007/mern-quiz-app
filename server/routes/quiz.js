const router = require("express").Router();
const JavaScripQuiz = require("../models/quiz.javascript");
// router.get("/", async (req, res) => {
//   res.send("hello");
// });

router.get("/api/quiz/js", async (req, res) => {
  try {
    const quiz = await JavaScripQuiz.find({})
    // res.json(quiz)
    res.json({
      success: true,
      data: quiz,
      message: `  success  get `,
  });
  } catch (error) {
    res.json({
      success: false,
      
      message: error.message,
  });
  }
});

router.post('/api/quiz', async (req, res) => {
  try {
      // Create a new instance of the JavaScripQuiz model with data from the request body
      const newQuestion = new JavaScripQuiz({
          question: req.body.question,
          options: req.body.options,
          correctAnswer: req.body.correctAnswer
      });

      // Save the new question to the database
      const savedQuestion = await newQuestion.save();

      res.status(201).json(savedQuestion); // Respond with the saved question object
  } catch (error) {
      console.error('Error saving question:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error message
  }
});
module.exports = router;
