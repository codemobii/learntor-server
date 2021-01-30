module.exports = (app) => {
  const exercise = require("../controllers/exercise.controller");

  // Create exercise
  app.post("/exercise", exercise.create);

  // Update course course
  app.get("/exercise", exercise.getExercise);

  // Update course course
  app.post("/exercise/:questionId", exercise.answer);
};
