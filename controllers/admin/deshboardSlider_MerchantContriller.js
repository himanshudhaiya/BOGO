const DeshboardSlider_Merchant = require("../../models/DeshboardSlider_Merchant");
const Adminauth = require("../../models/Adminauth");
const path = require("path");
const root = process.cwd();
const fs = require("fs");
const multer = require("multer");
const videoFilter = require("../../config/videoFilter");

// set storage engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/DeshboardSlider_Merchant"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  //   limits: { fileSize: 1000000 },
  // fileFilter: videoFilter,
}).fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

class DeshboardSlider_MerchantCantroller {
  static list = async (req, res) => {
    try {
      const admin = await Adminauth.find();
      const deshboardSlider = await DeshboardSlider_Merchant.find();
      res.render("admin/deshboardSlider_Merchant-list", {
        deshboardSlider,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong", error: true });
    }
  };

  static add = async (req, res) => {
    try {
      upload(req, res, async (err) => { 
        const deshboardSlider = new DeshboardSlider_Merchant({
          video: req.files.video ? req.files.video[0].filename : null,
          thumbnail: req.files ? req.files.thumbnail[0].filename : null,
          title: req.body.title,
        });
        await deshboardSlider.save();


        return res.send({
          message: "Deshboard Slider Added Successfully",
          error: false,
        });
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong", error: true });
    }
  };

  static delete = async (req, res) => {
    try {
      const deshboardSlider = await DeshboardSlider_Merchant.findById({
        _id: req.body.id,
      });
      fs.unlinkSync(
        path.join(
          root,
          `/public/uploads/WelcomeSlider_Merchant/${deshboardSlider.video}`
        )
      );
      fs.unlinkSync(
        path.join(
          root,
          `/public/uploads/WelcomeSlider_Merchant/${deshboardSlider.thumbnail}`
        )
      );
      await DeshboardSlider_Merchant.findByIdAndDelete({
        _id: req.body.id,
      });
      return res.send({
        message: "Deshboard Slider Deleted Successfully",
        error: false,
      });
    } catch (error) {
      console.log(error);
      return res.send({ message: "Something went wrong", error: true });
    }
  };
}
module.exports = DeshboardSlider_MerchantCantroller;
