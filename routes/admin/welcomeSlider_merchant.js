const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const welcomeSliderController = require("../../controllers/admin/welcomeSliderCintroller");



router.get("/list", NotLoggedIn, welcomeSliderController.list);
router.post("/add", NotLoggedIn, welcomeSliderController.add);
router.post("/delete", NotLoggedIn, welcomeSliderController.delete);


module.exports = router;