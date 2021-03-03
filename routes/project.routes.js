module.exports = (app) => {
  const project = require("../controllers/project.controller");

  // Update user
  app.post("/project", project.createProject);

  // Update course course
  app.get("/project", project.getProject);

  // Update course course
  app.get("/user_upload_project/:projectId", project.userUpload);
};
