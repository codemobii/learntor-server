const projectModel = require("../models/project.model");
const user_projectModel = require("../models/user_project.model");

// Create project
exports.createProject = async (request, response) => {
  const project = new projectModel({
    course: request.body.course,
    institute: request.body.institute,
    file: request.body.file,
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    desc: request.body.desc,
  });

  project
    .save()
    .then((data) => {
      //   return success response
      response.status(200).send({
        message: "Project created successfully",
        data,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while creating the project.",
        err,
      });
    });
};

// Get Project

exports.getProject = (req, res) => {
  projectModel
    .findone({ course: req.query.course })
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Course not found with id " + req.query.course,
        });
      }
      res.status(200).send({
        message: "Successful",
        project,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Course not found with id " + req.query.course,
          err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Course with id " + req.query.course,
        err,
      });
    });
};

// User upload project

exports.userUpload = (req, res) => {
  projectModel
    .findById(req.params.projectId)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Course not found with id " + req.params.projectId,
        });
      }
      const answer = new user_projectModel({
        course: project.course,
        institute: project.institute,
        file: request.body.file,
        desc: request.body.desc,
      });

      answer
        .save()
        .then((data) => {
          //   return success response
          response.status(200).send({
            message: "Project uploaded successfully",
            data,
          });
        })
        .catch((err) => {
          response.status(500).send({
            message: "Some error occurred while uploading the project.",
            err,
          });
        });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Project not found with id " + req.params.projectId,
          err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving project with id " + req.params.projectId,
        err,
      });
    });
};

// Trainer score project

exports.scoreProject = (req, res) => {
  user_projectModel
    .findById(req.params.projectId)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Project not found with id " + req.params.projectId,
        });
      }
      user_projectModel
        .findByIdAndUpdate(
          request.params.courseId,
          {
            score: req.body.score,
          },
          { new: true }
        )
        .then((res) => {
          //   return success response
          response.status(200).send({
            message: "Project scored successfully",
            res,
          });
        })
        .catch((err) => {
          return response.status(500).send({
            message: "Error updating course with id " + request.params.courseId,
            err,
          });
        });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Project not found with id " + req.params.projectId,
          err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving project with id " + req.params.projectId,
        err,
      });
    });
};

// Find user uploads

exports.getAnswers = (req, res) => {
  projectModel
    .find({ course: req.query.course })
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Course not found with id " + req.query.course,
        });
      }
      res.status(200).send({
        message: "Successful",
        project,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Course not found with id " + req.query.course,
          err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Course with id " + req.query.course,
        err,
      });
    });
};
