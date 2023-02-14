const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const deshboardSlider_MerchantController = require("../../controllers/admin/deshboardSlider_MerchantContriller");

router.get("/list", NotLoggedIn, deshboardSlider_MerchantController.list);
router.post("/add", NotLoggedIn, deshboardSlider_MerchantController.add);
// router.post("/delete", NotLoggedIn, deshboardSlider_MerchantController.delete);

module.exports = router;
