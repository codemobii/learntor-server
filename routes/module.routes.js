module.exports = (app) => {
  const module = require("../controllers/module.controller");

  // Update user
  app.post("/module", module.create);

  // Update course course
  app.get("/module", module.getModules);

  // Update course course
  app.get("/module/:moduleId", module.getModule);
};
