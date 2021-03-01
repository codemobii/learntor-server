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
