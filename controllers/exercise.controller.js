const Exercise = require("../models/exercise.model");
const moduleModel = require("../models/module.model");
const resultModel = require("../models/result.model");
const user_courseModel = require("../models/user_course.model");

exports.create = async (request, response) => {
  const exercise = new Exercise({
    question: request.body.question,
    answers: request.body.answers,
    correct: request.body.correct,
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

exports.result = async (request, response) => {
  // Find Course and update it with the request body
  moduleModel
    .find({ course: request.body.course })
    .then((modules) => {
      const l = modules.length;

      user_courseModel
        .findOne({ course: request.body.course })
        .then((course) => {
          const num = course.progress;

          const new_num = (1 / parseFloat(l)) * 100;

          const newest = parseFloat(num) + parseFloat(new_num);

          console.log(newest, num, new_num, course);

          user_courseModel
            .updateOne(
              { course: course._id },
              { progress: new_num },
              { new: true }
            )
            .then((course) => {
              const result = new resultModel({
                user: request.body.user,
                module: request.body.module,
                course: request.body.course,
                result: request.body.result,
                score: request.body.score,
              });
              result
                .save()
                .then((result) => {
                  response.status(200).send({
                    message: "Result processed successfully",
                    result,
                  });
                })
                .catch((error) => {
                  response.status(500).send({
                    message: "Error processing result",
                    error,
                  });
                });
            })
            .catch((err) => {
              if (err.kind === "ObjectId") {
                return response.status(404).send({
                  message:
                    "Course not found with id " + request.params.courseId,
                  err,
                });
              }
              return response.status(500).send({
                message:
                  "Error updating course with id " + request.params.courseId,
                err,
              });
            });
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "Course not found with id " + req.params.courseId,
              err,
            });
          }
          return res.status(500).send({
            message: "Error retrieving Course with id " + req.params.courseId,
            err,
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving modules.",
        err,
      });
    });
};

exports.getResult = (request, response) => {
  resultModel
    .findById(request.params.resultId)
    .then((result) => {
      //   return success response
      response.status(200).send({
        message: "Successfully",
        result,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return response.status(404).send({
          message: "Result not found with id " + request.params.resultId,
          err,
        });
      }
      response.status(500).send({
        message: "Some error occurred while retrieving result.",
        err,
      });
    });
};

// Get course for a store

// exports.answer = (request, response) => {
//   Exercise.findById(request.params.questionId)
//     .then((question) => {
//       //   return success response

//       const isCorrect = {
//         question: question.question,
//         answer: question.answer,
//         user_answer: request.body.answer,
//         isCorrect: true,
//       };

//       const notCorrect = {
//         question: question.question,
//         answer: question.answer,
//         user_answer: request.body.answer,
//         isCorrect: false,
//       };

//       const answer =
//         request.body.answer === question.answer ? isCorrect : notCorrect;

//       response.status(200).send({
//         message: "Successfully",
//         answer,
//       });
//     })
//     .catch((err) => {
//       response.status(500).send({
//         message: "Some error occurred while retrieving questions.",
//         err,
//       });
//     });
// };
