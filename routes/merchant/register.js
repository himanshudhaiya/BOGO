const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Merchantauth");
const MerchantUserController = require("../../controllers/merchant/userController");

router.post("/register", MerchantUserController.register);
router.post("/otp_verify", MerchantUserController.otp_verify);

router.post("/update_profile", MerchantUserController.update_profile);
router.post("/login", MerchantUserController.login);

module.exports = router;
