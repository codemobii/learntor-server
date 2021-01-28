module.exports = (app) => {
  const course = require("../controllers/course.controller.js");

  // Create course
  app.post("/course", course.create);

  // Update course course
  app.put("/course/:courseId", course.update);

  // Update course course
  app.get("/course", course.getCourses);

  // Update course course
  app.get("/course/:courseId", course.getCourse);
};
