const home = require("./routes/app/home");
const apiRoutes = require("./routes/app/apiRoutes");
const auth = require("./routes/app/auth");

const AppRoutes = (app) => {
  app.use("/app", home);
  app.use("/app/user", auth);
  app.use("/app", apiRoutes);
};

module.exports = AppRoutes;
