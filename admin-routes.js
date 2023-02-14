const main = require("./routes/admin/main");
const auth = require("./routes/admin/auth");
const dashboard = require("./routes/admin/dashboard");
const user = require("./routes/admin/user");
const aboutus = require("./routes/admin/aboutus");
const faq = require("./routes/admin/faq");
const privacypolicy = require("./routes/admin/privacypolicy");
const termscondition = require("./routes/admin/termscondition");
const contact = require("./routes/admin/contact");
const category = require("./routes/admin/category");

const merchantUser = require("./routes/admin/merchantUser");
const WelcomeSlider_Merchant = require("./routes/admin/welcomeSlider_merchant");
const deshboardSlider_Merchant = require("./routes/admin/deshboardSlider_merchant");

const AdminRoutes = (app) => {
  app.use("/", main);
  app.use("/admin", auth);
  app.use("/admin", dashboard);
  app.use("/admin/users", user);
  app.use("/admin", aboutus);
  app.use("/admin", faq);
  app.use("/admin", privacypolicy);
  app.use("/admin", termscondition);
  app.use("/admin/contact", contact);
  app.use("/admin/category", category);

  app.use("/admin/merchantUser", merchantUser);
  app.use("/admin/WelcomeSlider_Merchant", WelcomeSlider_Merchant);
  app.use("/admin/deshboardSlider_Merchant", deshboardSlider_Merchant);
  
};

module.exports = AdminRoutes;
