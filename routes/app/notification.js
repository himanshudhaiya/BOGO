const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Appauth");
const NotificationController = require("../../controllers/app/notificationController");

router.get("/get", NotLoggedIn, NotificationController.get);

module.exports = router;
