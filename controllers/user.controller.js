const userModel = require("../models/user.model");

exports.findUser = (request, response) => {
  userModel
    .findById(request.params.userId)
    .then((data) => {
      console.log(request.query);
      //   return success response
      response.status(200).send({
        data,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving user.",
        err,
      });
    });
};

// update user
exports.update = (request, response) => {
  // Find Course and update it with the request body
  userModel
    .findById(request.params.userId)
    .then((data) => {
      userModel
        .findByIdAndUpdate(
          request.params.userId,
          {
            fullname: request.body.fullname || data.fullname,
            role: request.body.role || data.role,
            firstName: request.body.firstName || data.firstName,
            lastName: request.body.lastName || data.lastName,
            profilePic: request.body.profilePic || data.profilePic,
            bio: request.body.bio || data.bio,
          },
          { new: true }
        )
        .then((user) => {
          //   return success response
          response.status(200).send({
            message: "Profile updated successfully",
            user,
          });
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return response.status(404).send({
              message: "Profile not found with id " + request.params.userId,
              err,
            });
          }
          return response.status(500).send({
            message: "Error updating Profile with id " + request.params.userId,
            err,
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving user.",
        err,
      });
    });
};
