const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const MerchantUserController = require("../../controllers/admin/merchantUsercontroller");


router.get("/list", NotLoggedIn, MerchantUserController.list);
router.post("/approved", NotLoggedIn, MerchantUserController.Approved);


module.exports = router;