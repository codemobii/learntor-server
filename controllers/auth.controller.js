const User = require("../models/user.model");
const Participant = require("../models/participant.model");
const Course = require("../models/course.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { useEmail } = require("./email.controller");

const { status, sendEmail } = useEmail();

function makeRef(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "colourjim@gmail.com",
    pass: "Ihavenolife1",
  },
});

// Create and Save a new Note
exports.register = (request, response) => {
  const user = new User({
    email: request.body.email,
    password: request.body.password,
    fullname: request.body.fullname,
    phone: request.body.phone,
    role: request.body.role || 3,
  });
  user
    .save()
    .then((result) => {
      sendEmail(
        request.body.email,
        "Welcome to Learntor",
        "Thank you for joining Learntor. We wish to satisfy your learning needs"
      );
      response.status(200).send({
        message: "Account Created Successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error creating user",
        error,
      });
    });
};

// Login user here

exports.login = (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      if (request.body.password !== user.password) {
        response.status(400).send({
          message: "Passwords does not match",
          e: true,
        });
      } else {
        //   create JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );

        //   return success response
        response.status(200).send({
          message: "Login Successful",
          user,
          token,
        });
      }
    })
    .catch((err) => {
      response.status(404).send({
        message: "No account associated with this email",
        e: true,
        err,
      });
    });
};

// Request for password reset

exports.forgotPassword = (request, response) => {
  // Find user and update resetCode with the request body
  const code = makeRef(4);

  User.updateOne(
    { email: request.body.email },
    {
      resetCode: code,
    },
    { new: true }
  )
    .then((user) => {
      console.log(request.body.email);
      if (!user) {
        return response.status(404).send({
          message: "No user associated with this email",
        });
      }
      sendEmail(
        request.body.email,
        "Password Reset Code",
        `Your password reset code is <b>${code}<b/>`
      );

      response.status(200).send({
        message: "Reset code sent, check your email",
        user,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return response.status(404).send({
          message: "No user associated with this email",
          err,
        });
      }

      return response.status(500).send({
        message: "Error sending reset code",
        err,
      });
    });
};

// Verify code

exports.verifyCode = (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      const code = request.body.resetCode;
      if (parseFloat(code) !== user.resetCode) {
        response.status(400).send({
          message: "Code could not be verified",
          user,
        });
      } else {
        // return success response
        response.status(200).send({
          message: "Code verified successfully",
          user,
        });
      }
    })
    .catch((e) => {
      response.status(404).send({
        message: "Account found",
        e,
      });
    });
};

// Change password

exports.resetPassword = (request, response) => {
  User.updateOne(
    { email: request.body.email },
    {
      password: request.body.password,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return response.status(404).send({
          message: "No user associated with this email",
        });
      }
      sendEmail(
        request.body.email,
        "Password Reset Successful",
        `Your password has been changed successfully`
      );
      response.status(200).send({
        message: "Password reset was successful",
        user,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return response.status(404).send({
          message: "No user associated with this email",
          err,
        });
      }

      return response.status(500).send({
        message: "Error sending resetting password",
        err,
      });
    });
};

// Register to course

exports.registerCourse = (request, response) => {
  Participant.findOne({ user: request.body.user })
    .then((user) => {
      console.log(user);
      if (!user) {
        Course.findOne({ courseCode: request.body.course })
          .then((course) => {
            if (course) {
              User.findById(request.body.user).then((user) => {
                if (user) {
                  const participant = new Participant({
                    user: request.body.user,
                    course: course._id,
                    institute: course.institute,
                  });
                  participant
                    .save()
                    .then((result) => {
                      sendEmail(
                        user.email,
                        "Course Registration",
                        `Congratulations!. you have successfully registered for ${course.title}, you can now started following the course.`
                      );
                      response.status(200).send({
                        message: "Successful",
                        result,
                      });
                    })
                    .catch((error) => {
                      response.status(500).send({
                        message: "Error registering",
                        error,
                      });
                    });
                } else {
                  response.status(404).send({
                    message: "User not found",
                  });
                }
              });
            } else {
              response.status(404).send({
                message: "Course not found",
              });
            }
          })
          .catch((error) => {
            response.status(404).send({
              message: "This course was not found",
              error,
            });
          });
      } else {
        Course.findOne({ courseCode: request.body.course })
          .then((course) => {
            if (course) {
              response.status(200).send({
                message: "Successful",
                course,
              });
            } else {
              response.status(404).send({
                message: "This course was not found",
                error,
              });
            }
          })
          .catch((error) => {
            response.status(404).send({
              message: "This course was not found",
              error,
            });
          });
      }
    })
    .catch((e) => {
      response.status(404).send({
        message: "Account not found",
        e,
      });
    });
};
