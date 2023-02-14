const WelcomeSlider_Merchant = require("../../models/WelcomeSlider_Merchant");
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const multer = require("multer");
const videoFilter = require("../../config/videoFilter");
const Adminauth = require("../../models/Adminauth");

// set storage engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/WelcomeSlider_Merchant"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// Init Upload
const upload = multer({
  storage: storage,
  //   limits: { fileSize: 1000000 },
  fileFilter: videoFilter,
}).single("video");

class WelcomeSliderCantroller {
  static list = async (req, res) => {
    try {
      const admin = await Adminauth.find();
      const welcomeSlider = await WelcomeSlider_Merchant.find();
      res.render("admin/WelcomeSlider_Merchant-list", { welcomeSlider, admin });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  static add = async (req, res) => {
    try {
      upload(req, res, async (err) => {
        const welcomeSlider = await WelcomeSlider_Merchant.find().countDocuments();
        if (welcomeSlider < 5) {
          const welcomeSlider = new WelcomeSlider_Merchant({
            video: req.file.filename,
          });
          await welcomeSlider.save();
          return res.send({ message: "Welcome Slider Added Successfully" });
        } else {
          return res.send({ message: "You can add only 5 Welcome Slider",
            error: true
        });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  static delete = async (req, res) => {
    try {
      const welcomeSlider = await WelcomeSlider_Merchant.findById({
        _id: req.body.id,
      });
      fs.unlinkSync(
        path.join(root, "/public/uploads/WelcomeSlider_Merchant/" + welcomeSlider.video)
      );
      await WelcomeSlider_Merchant.findByIdAndDelete({
        _id: req.body.id,
      });
      return res.send({ message: "Welcome Slider Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
}
module.exports = WelcomeSliderCantroller;
