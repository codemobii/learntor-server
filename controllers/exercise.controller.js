const Exercise = require("../models/exercise.model");

exports.create = async (request, response) => {
  const exercise = new Exercise({
    question: request.body.question,
    answer: request.body.answer,
    options: request.body.options,
    module: request.body.module,
  });
  exercise
    .save()
    .then((result) => {
      response.status(200).send({
        message: "Question added successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error adding question",
        error,
      });
    });
};

// Get course for a store

exports.getExercise = (request, response) => {
  Exercise.find({ module: request.query.module })
    .then((questions) => {
      //   return success response
      response.status(200).send({
        message: "Successfully",
        questions,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving questions.",
        err,
      });
    });
};

// Get course for a store

exports.answer = (request, response) => {
  Exercise.findById(request.params.questionId)
    .then((question) => {
      //   return success response

      const isCorrect = {
        question: question.question,
        answer: question.answer,
        user_answer: request.body.answer,
        isCorrect: true,
      };

      const notCorrect = {
        question: question.question,
        answer: question.answer,
        user_answer: request.body.answer,
        isCorrect: false,
      };

      const answer =
        request.body.answer === question.answer ? isCorrect : notCorrect;

      response.status(200).send({
        message: "Successfully",
        answer,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving questions.",
        err,
      });
    });
};
