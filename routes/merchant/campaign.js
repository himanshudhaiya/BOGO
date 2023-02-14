const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Merchantauth");
const Campaign = require("../../controllers/merchant/campaignController");

router.post("/add", NotLoggedIn, Campaign.add);

module.exports = router;