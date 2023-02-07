const Category = require("../../models/Category");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const datatablesQuery = require("datatables-query");

class CategoryController {
  static datatable_data = async (req, res) => {
    try {
      const params = req.body;
      const query = datatablesQuery(Category);
      const raw = await query.run(params);
      return res.send(raw);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static list = async (req, res) => {
    try {
      const admin = await Adminauth.find();
      return res.render("admin/category-list", { admin });
    } catch (error) {
      return res.send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an icon");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        const category = Category({
          icon: req.file.filename,
          name: req.body.name,
        });
        await category.save();
        return res.send({
          error: false,
          message: "Category added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static edit = async (req, res) => {
    try {
      const category = await Category.findOne({
        _id: req.body.editid,
      });

      await Category.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          name: req.body.editname,
          updated_at: Date.now(),
        }
      );

      return res.send({
        error: false,
        message: "Category Updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const category = await Category.findOne({
        _id: req.body.id,
      });
      await Category.deleteOne({
        _id: category.id,
      });
      return res.send({
        error: false,
        message: "Category Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/category"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  //   limits: {
  //     fileSize: 5000000,
  //   },
  fileFilter: imageFilter,
}).single("icon");

module.exports = CategoryController;
