module.exports = (app) => {
  const unit = require("../controllers/unit.controller");

  // Update user
  app.post("/units", unit.create);

  // Update course course
  app.put("/units/:unitId", unit.update);

  // Update course course
  app.get("/units", unit.getUnits);

  // Update course course
  app.get("/units/:unitId", unit.getSingleUnit);
};
