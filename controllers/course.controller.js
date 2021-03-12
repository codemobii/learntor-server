const Course = require("../models/course.model");
const user_courseModel = require("../models/user_course.model");
const participantModel = require("../models/participant.model");

const cloudinary = require("cloudinary").v2;

// cloudinary configuration
cloudinary.config({
  cloud_name: "digital-specie",
  api_key: "228755343147422",
  api_secret: "L7IveOV6v4ZrUJJkXEN2qhZIGDk",
});

function makeRef(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Create course

exports.create = (request, response) => {
  const code = makeRef(4);
  // collected image from a user
  const data = {
    cover: request.body.cover,
  };

  var str = request.body.title;
  var matches = str.match(/\b(\w)/g);
  var acronym = matches.join("");

  const course = new Course({
    title: request.body.title,
    courseCode: acronym + "-" + code,
    institute: request.body.institute,
    instituteName: request.body.instituteName,
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    disabled: false,
    desc: request.body.desc,
    cover: data.cover,
  });

  // Save Course in the database
  course
    .save()
    .then((data) => {
      //   return success response
      response.status(200).send({
        message: "Course created successfully",
        data,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while creating the Course.",
        err,
      });
    });
};

// Edit course

exports.update = (request, response) => {
  // Find Course and update it with the request body
  Course.findByIdAndUpdate(
    request.params.courseId,
    {
      title: request.body.title,
      startDate: request.body.startDate,
      endDate: request.body.endDate,
      disabled: request.body.disabled,
      desc: request.body.desc,
      cover: request.body.cover,
    },
    { new: true }
  )
    .then((course) => {
      if (!course) {
        return response.status(404).send({
          message: "Course not found with id " + request.params.courseId,
        });
      }

      //   return success response
      response.status(200).send({
        message: "Course updated successfully",
        course,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return response.status(404).send({
          message: "Course not found with id " + request.params.courseId,
          err,
        });
      }
      return response.status(500).send({
        message: "Error updating course with id " + request.params.courseId,
        err,
      });
    });
};

// Get course for a store

exports.getCourses = (request, response) => {
  Course.find({ institute: request.query.institute })
    .then((courses) => {
      console.log(request.query);
      //   return success response
      response.status(200).send({
        message: "Successfully",
        courses,
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

exports.getCourse = (req, res) => {
  Course.findById(req.params.courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).send({
          message: "Course not found with id " + req.params.courseId,
        });
      }
      res.status(200).send({
        message: "Successfully",
        course,
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
};

exports.getUserCourse = (req, res) => {
  user_courseModel
    .findOne({ course: req.params.courseId })
    .then((course) => {
      if (!course) {
        return res.status(404).send({
          message: "Course not found with id " + req.params.courseId,
        });
      }
      res.status(200).send({
        message: "Successful",
        course,
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
};

exports.getUserCourses = (req, res) => {
  user_courseModel
    .find({ user: req.query.user })
    .then((courses) => {
      res.status(200).send({
        message: "Successful",
        courses,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving courses",
        err,
      });
    });
};

//

exports.getParticpants = (req, res) => {
  participantModel
    .find({ course: req.params.courseId })
    .then((participants) => {
      res.status(200).send({
        message: "Successful",
        participants,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving courses",
        err,
      });
    });
};
