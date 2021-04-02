const commentModel = require("../models/comment.model");

exports.create = (request, response) => {
  const comment = new commentModel({
    user: request.body.user,
    comment: request.body.comment,
    unit: request.body.unit,
    module: request.body.module,
    course: request.body.course,
  });

  // Save Course in the database
  comment
    .save()
    .then((data) => {
      //   return success response
      response.status(200).send({
        message: "Comment posted",
        data,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while posting comment.",
        err,
      });
    });
};

// Get course for a store

exports.getComments = (request, response) => {
  commentModel
    .find({ module: request.query.module })
    .populate("user")
    .then((comments) => {
      console.log(request.query);
      //   return success response
      response.status(200).send({
        message: "Successfully",
        comments,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving comments.",
        err,
      });
    });
};
