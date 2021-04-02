module.exports = (app) => {
  const comment = require("../controllers/comment.controller");

  // Update user
  app.post("/comments", comment.create);

  // Update course course
  app.get("/comments", comment.getComments);
};
