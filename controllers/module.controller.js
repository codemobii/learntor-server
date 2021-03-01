const Module = require("../models/module.model");
const cloudinary = require("cloudinary").v2;

// cloudinary configuration
cloudinary.config({
  cloud_name: "digital-specie",
  api_key: "228755343147422",
  api_secret: "L7IveOV6v4ZrUJJkXEN2qhZIGDk",
});

// Create a module

exports.create = (request, response) => {
  // collected image from a user
  const data = {
    video: request.body.video,
  };

  const module = new Module({
    title: request.body.title,
    course: request.body.course,
    institute: request.body.institute,
    video: request.body.video,
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    disabled: false,
    desc: request.body.desc,
  });

  // Save Note in the database
  module
    .save()
    .then((data) => {
      //   return success response
      response.status(200).send({
        message: "Module created successfully",
        data,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while creating the module.",
        err,
      });
    });
};

// Get course for a store

exports.getModules = (request, response) => {
  Module.find({ course: request.query.course })
    .then((modules) => {
      console.log(request.query);
      //   return success response
      response.status(200).send({
        message: "Successfully",
        modules,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving courses.",
        err,
      });
    });
};

// Get a course

exports.getModule = (req, res) => {
  Module.findById(req.params.moduleId)
    .then((module) => {
      if (!module) {
        return res.status(404).send({
          message: "Module not found with id " + req.params.moduleId,
        });
      }
      res.status(200).send({
        message: "Successfully",
        module,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Module not found with id " + req.params.moduleId,
          err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving module with id " + req.params.moduleId,
        err,
      });
    });
};
