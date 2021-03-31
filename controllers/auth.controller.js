const User = require("../models/user.model");
const Participant = require("../models/participant.model");
const Course = require("../models/course.model");
const jwt = require("jsonwebtoken");
const { useEmail } = require("./email.controller");
const user_courseModel = require("../models/user_course.model");

const { sendEmail } = useEmail();

function makeRef(length) {
  var result = "";
  var characters = "123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Create and Save a new Note
exports.register = (request, response) => {
  const user = new User({
    email: request.body.email,
    password: request.body.password,
    fullname: request.body.fullname || "",
    phone: request.body.phone,
    role: request.body.role || 3,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
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
        status: true,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error creating user",
        status: false,
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
          status: false,
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

        User.updateOne(
          { email: request.body.email },
          {
            token: token,
          },
          { new: true }
        )
          .then(() => {
            //   return success response
            response.status(200).send({
              message: "Login Successful",
              token,
              user,
              status: true,
            });
          })
          .catch(() => {
            response.status(404).send({
              message: "No account associated with this email",
              status: false,
              err,
            });
          });
      }
    })
    .catch((err) => {
      response.status(404).send({
        message: "No account associated with this email",
        status: false,
        err,
      });
    });
};

// Request for password reset

exports.forgotPassword = (request, response) => {
  // Find user and update resetCode with the request body
  const code = makeRef(4);

  User.findOne({ email: request.body.email })
    .then((res) => {
      if (res) {
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
            } else {
              sendEmail(
                request.body.email,
                "Password Reset Code",
                `Your password reset code is <b>${code}<b/>`
              );

              response.status(200).send({
                message: "Reset code sent, check your email",
                status: true,
                code,
              });
            }
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
      } else {
        return response.status(404).send({
          message: "No user associated with this email",
        });
      }
    })
    .catch((er) => {
      return response.status(404).send({
        message: "No user associated with this email",
        err,
      });
    });
};

// Verify code

exports.verifyCode = (request, response) => {
  const code = request.body.resetCode;
  User.findOne({ resetCode: parseFloat(code) })
    .then((user) => {
      // return success response
      response.status(200).send({
        message: "Code verified successfully",
        user,
      });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Invalid reset code supplied.",
        e,
      });
    });
};

// Change password

exports.resetPassword = (request, response) => {
  const code = request.body.resetCode;
  User.updateOne(
    { resetCode: parseFloat(code) },
    {
      password: request.body.password,
    },
    { new: true }
  )
    .then((user) => {
      console.log(user);
      if (user.n === 0) {
        return response.status(404).send({
          message: "Code doesn't match",
        });
      } else {
        User.findOne({ resetCode: parseFloat(code) }).then((res) => {
          sendEmail(
            res.email,
            "Password Reset Successful",
            `Your password has been changed successfully`
          );
          response.status(200).send({
            message: "Password reset was successful",
            user,
          });
        });
      }
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
  Course.findOne({ courseCode: request.body.course })
    .then((course) => {
      if (course) {
        Participant.findOne({
          $and: [{ user: request.body.user }, { course: course._id }],
        })
          .then((user) => {
            console.log(user);
            if (!user) {
              User.findById(request.body.user).then((user) => {
                if (user) {
                  const participant = new Participant({
                    user: request.body.user,
                    course: course._id,
                    institute: course.institute,
                  });

                  const UserCouse = new user_courseModel({
                    course: course._id,
                    user: request.body.user,
                  });
                  participant
                    .save()
                    .then((result) => {
                      UserCouse.save()
                        .then((res) => {
                          sendEmail(
                            user.email,
                            "Course Registration",
                            `Congratulations!. you have successfully registered for ${course.title} with the course code ${request.body.course}, you can now started following the course.`
                          );
                          response.status(200).send({
                            message:
                              "You have successful registered for this course",
                            course,
                            e: false,
                          });
                        })
                        .catch((e) => {
                          response.status(500).send({
                            message: "Error registering me",
                            e,
                          });
                        });
                    })
                    .catch((e) => {
                      response.status(500).send({
                        message: "Error registering",
                        e,
                      });
                    });
                } else {
                  response.status(404).send({
                    message: "User not found",
                    e: true,
                  });
                }
              });
            } else {
              Course.findOne({ courseCode: request.body.course })
                .then((course) => {
                  if (course) {
                    response.status(200).send({
                      message: "Welcome back to the course",
                      course,
                      e: false,
                    });
                  } else {
                    response.status(404).send({
                      message: "This course was not found",
                      error,
                    });
                  }
                })
                .catch((e) => {
                  response.status(404).send({
                    message: "This course not found",
                    e,
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
      } else {
        response.status(404).send({
          message: "Course was not found",
          e: true,
        });
      }
    })
    .catch((e) => {
      response.status(404).send({
        message: "This course was not found",
        e,
      });
    });
};

// Logout bro

exports.logout = (request, response) => {
  User.updateOne(
    { token: request.body.token },
    {
      token: null,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return response.status(404).send({
          message: "No user associated with this token",
          status: false,
        });
      }
      response.status(200).send({
        message: "Successfully logged out",
        status: true,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return response.status(404).send({
          message: "No user associated with this email",
          err,
          status: false,
        });
      }

      return response.status(500).send({
        message: "Error sending reset code",
        err,
        status: false,
      });
    });
};
