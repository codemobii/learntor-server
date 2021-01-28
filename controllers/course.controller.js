const Course = require("../models/course.model");

function makeRef(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const code = makeRef(3);

// Create course

exports.create = (request, response) => {
  // Create a Note
  const course = new Course({
    title: request.body.title,
    courseCode: request.body.courseCode + "-" + code,
    institute: request.body.institute,
    instituteName: request.body.instituteName,
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    disabled: false,
    desc: request.body.desc,
  });

  // Save Note in the database
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
  // Find note and update it with the request body
  Course.findByIdAndUpdate(
    request.params.courseId,
    {
      title: request.body.title,
      startDate: request.body.startDate,
      endDate: request.body.endDate,
      disabled: request.body.disabled,
      desc: request.body.desc,
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
          message: "Note not found with id " + req.params.courseId,
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
          message: "Note not found with id " + req.params.courseId,
          err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.courseId,
        err,
      });
    });
};
