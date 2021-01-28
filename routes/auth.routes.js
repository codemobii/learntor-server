module.exports = (app) => {
  const user = require("../controllers/auth.controller.js");

  // Register user
  app.post("/register", user.register);

  // Login user
  app.post("/login", user.login);

  // Login user
  app.post("/forgotPassword", user.forgotPassword);

  // Verify code
  app.post("/verifyCode", user.verifyCode);

  // Login user
  app.post("/resetPassword", user.resetPassword);

  // Login user
  app.post("/registerCourse", user.registerCourse);
};
