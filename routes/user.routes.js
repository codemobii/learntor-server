module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  // Update user
  app.put("/users/:userId", user.update);

  // Get user
  app.get("/users/:userId", user.findUser);
};
