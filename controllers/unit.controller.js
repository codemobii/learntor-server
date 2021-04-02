const unitModel = require("../models/unit.model");

exports.create = (request, response) => {
  // collected image from a user

  const unit = new unitModel({
    title: request.body.title,
    course: request.body.course,
    institute: request.body.institute,
    module: request.body.module,
    video: request.body.video,
    disabled: false,
    desc: request.body.desc,
  });

  // Save Note in the database
  unit
    .save()
    .then((data) => {
      //   return success response
      response.status(200).send({
        message: "Unit created successfully",
        data,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while creating the unit.",
        err,
      });
    });
};

exports.update = (request, response) => {
  // Find Course and update it with the request body
  unitModel
    .findByIdAndUpdate(
      request.params.unitId,
      {
        title: request.body.title,
        video: request.body.video,
        desc: request.body.desc,
      },
      { new: true }
    )
    .then((course) => {
      if (!course) {
        return response.status(404).send({
          message: "Unit not found with id " + request.params.unitId,
        });
      }

      //   return success response
      response.status(200).send({
        message: "Unit updated successfully",
        course,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return response.status(404).send({
          message: "Unit not found with id " + request.params.unitId,
          err,
        });
      }
      return response.status(500).send({
        message: "Error updating unit with id " + request.params.unitId,
        err,
      });
    });
};

// Get course for a store

exports.getUnits = (request, response) => {
  unitModel
    .find({ module: request.query.module })
    .then((units) => {
      console.log(request.query);
      //   return success response
      response.status(200).send({
        message: "Successfully",
        units,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving units.",
        err,
      });
    });
};

exports.getSingleUnit = (req, res) => {
  unitModel
    .findById(req.params.unitId)
    .then((unit) => {
      if (!unit) {
        return res.status(404).send({
          message: "Unit not found with id " + req.params.unitId,
        });
      }
      res.status(200).send({
        message: "Successfully",
        unit,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Unit not found with id " + req.params.unitId,
          err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving unit with id " + req.params.unitId,
        err,
      });
    });
};
