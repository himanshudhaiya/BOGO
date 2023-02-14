const merchant = require("./routes/merchant/register");
const campaign = require("./routes/merchant/campaign")


const MerchantRoutes = (app) => {
    app.use("/merchant", merchant);
    app.use("/merchant/campaign", campaign);
};
  
  module.exports = MerchantRoutes;