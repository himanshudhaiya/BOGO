const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Appauth");
const ApiController = require("../../controllers/app/apiController");

router.get("/aboutus/list", NotLoggedIn, ApiController.about);
router.get("/contactus/list", NotLoggedIn, ApiController.contact);
router.get("/faq/list", NotLoggedIn, ApiController.faq);
router.get("/privacypolicy/list", NotLoggedIn, ApiController.privacypolicy);
router.get("/termscondition/list", NotLoggedIn, ApiController.termscondition);
router.get("/users/list", NotLoggedIn, ApiController.users);
router.get("/category/list", NotLoggedIn, ApiController.category);

module.exports = router;
