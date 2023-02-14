const MerchantUser = require("../../models/MerchantUser");
const Otp = require("../../models/Otp");
const bcrypt = require("bcrypt");
require("dotenv");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const root = process.cwd();
const path = require("path");
const baseURL = process.env.URL;
const fs = require("fs");

// referral_code Auto Generate random 5 digits
function referral_codes() {
  var text = "";
  var possible = "0123456789";
  for (var i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

class MerchantUserController {
  // Merchant User Login(gmail, facebook, email and password)
  static login = async (req, res) => {
    try {
      let email = req.body.email;
      let facebook_id = req.body.facebook_id;
      let google_id = req.body.google_id;

      if (email) {
        let email = req.body.email;
        let password = req.body.password;

        if (email == "") {
          return res.status(400).json({ message: "Email is required" });
        }
        if (password == "") {
          return res.status(400).json({ message: "Password is required" });
        }

        const user = await MerchantUser.findOne({
          email: email,
        });
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }
        const validPassword = await bcrypt.compare(
          password,
          user.create_password
        );

        if (!validPassword) {
          return res.status(400).json({ message: "Invalid Password" });
        }


        // let is_registered = 0;
        // if (user.is_registered == 1) {
        //   is_registered = 1;
        // }

        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.TOKEN_SECRET
        );
        return res.status(200).json({
          message: "User login successfully",
          status: 200,
          success: true,
          token: token,
        });
      } else if (google_id) {
        const user = await MerchantUser.findOne({
          email: google_id
        })
        if (!user) {
          const user = User({
            email: google_id
          })
          let user1 = await user.save()
          // console.log(user1)

          if (google_id == user.email) {
            const token = jwt.sign({
              _id: user1._id,
            }, process.env.TOKEN_SECRET)
            let data = {
              token: token,
            }

            return res.status(200).send({
              message: "User Login Successfully",
              status: 201,
              success: true,
              token: data
            })
          }
        } 
        // else {
        //   const token = jwt.sign({
        //     _id: user._id,
        //   }, process.env.TOKEN_SECRET)
        //   let data = {
        //     token: token,
        //   }

          return res.status(200).send({
            message: "User Login Successfully",
            status: 201,
            success: true,
            token: data
          })
        // }
      } else if (facebook_id) {
        const user = await MerchantUser.findOne({
          facebook_id: facebook_id
        })

        if (!user) {
          const user = MerchantUser({
            facebook_id: facebook_id
          })
          let user1 = await user.save()
          // console.log(user1)

          if (facebook_id == user.facebook_id) {
            const token = jwt.sign({
              _id: user1._id,
            }, process.env.TOKEN_SECRET)
            let data = {
              token: token,
            }

            return res.status(200).send({
              message: "User Login Successfully",
              status: 201,
              success: true,
              token: data
            })
          }
        }
        //  else {
        //   const token = jwt.sign({
        //     _id: user._id,
        //   }, process.env.TOKEN_SECRET)
        //   let data = {
        //     token: token,
        //   }

          return res.status(200).send({
            message: "User Login Successfully",
            status: 201,
            success: true,
            token: data
          })
        }
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong please try again later",
        status: 500,
        success: false,
      });
    }
  };

  // Merchant User Register
  static register = async (req, res) => {
    try {
      let first_name = req.body.first_name;
      let last_name = req.body.last_name;
      let email = req.body.email;
      let create_password = req.body.create_password;
      let repeat_password = req.body.repeat_password;
      let mobile_number = req.body.mobile_number;

      // mobile_number regex validation
      let mobile_number_regex = /^[0-9]{10}$/;

      // email regex validation
      let email_regex =
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

      // password regex validation
      let password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

      if (first_name == "") {
        return res.status(401).json({
          message: "First name is required",
          status: 401,
          success: false,
        });
      } else if (last_name == " ") {
        return res.status(401).json({
          message: "Last name is required",
          status: 401,
          success: false,
        });
      } else if (email == " ") {
        return res.status(401).json({
          message: "Email is required",
          status: 401,
          success: false,
        });
      } else if (!email_regex.test(email)) {
        return res.status(401).json({
          message: "Email is invalid",
          status: 401,
          success: false,
        });
      } else if (create_password == " ") {
        return res.status(401).json({
          message: "Password is required",
          status: 401,
          success: false,
        });
      } else if (repeat_password == " ") {
        return res.status(401).json({
          message: "Repeat password is required",
          status: 401,
          success: false,
        });
      } else if (mobile_number == " ") {
        return res.status(401).json({
          message: "Mobile number is required",
          status: 401,
          success: false,
        });
      } else if (!mobile_number_regex.test(mobile_number)) {
        return res.status(401).json({
          message: "Mobile number is invalid",
          status: 401,
          success: false,
        });
      } else if (create_password == " ") {
        return res.status(401).json({
          message: "Password is required",
          status: 401,
          success: false,
        });
      } else if (create_password !== repeat_password) {
        return res.status(401).json({
          message: "Passwords do not match",
          status: 401,
          success: false,
        });
      }

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hash = await bcrypt.hash(create_password, salt);

      const merchantUser = await MerchantUser.find({
        $or: [{ email: email }, { mobile_number: mobile_number }],
      });
      if (merchantUser.length > 0) {
        return res.status(401).json({
          message: "Merchant user already exists",
          status: 401,
          success: false,
        });
      }

      let user = MerchantUser({
        first_name: first_name,
        last_name: last_name,
        email: email,
        create_password: hash,
        mobile_number: mobile_number,
      });
      await user.save();
      // return console.log(req.body);

      let newOtp = referral_codes();

      const otp = Otp({
        user,
        otp: newOtp,
        created_at: Date.now(),
        update_at: Date.now(),
      });
      await otp.save();

      return res.status(200).json({
        message: "Otp sent successfully",
        status: 200,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong please try again later",
        status: 500,
        success: false,
      });
    }
  };

  // Merchant User Otp Verify
  static otp_verify = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      const { mobile_number, otp } = req.body;

      const user = await MerchantUser.findOne({ mobile_number });

      if (!user) return res.status(404).send("User not found");

      const userOtp = await Otp.findOne({ user });
      let is_registered = 0;
      if (user && user.mobile_number && user.mobile_number != "") {
        is_registered = 1;
      }

      if (otp == userOtp.otp) {
        //create and assign a token
        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.TOKEN_SECRET
        );
        let returnData = {
          token: token,
          is_registered: is_registered,
        };

        return res.send(returnData);
      }

      return res.status(401).send("Invalid otp");
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };

  // Merchant User Profile
  static update_profile = async (req, res) => {
    try {
      upload(req, res, async (err) => {
        var token = req.body.token;
        if (!token) return res.status(401).send("Access Denied");

        const payload = jwt.decode(token, process.env.TOKEN_SECRET);
        const user = await MerchantUser.findById(payload._id);
        if (!user) return res.status(401).send("User not found");

        const profile = await MerchantUser.findByIdAndUpdate(
          user._id,
          {
            // first_name: req.body.first_name,
            // last_name: req.body.last_name,
            // email: req.body.email,
            // mobile_number: req.body.mobile_number,
            type_of_business: req.body.type_of_business,
            location: req.body.location,
            business_name: req.body.business_name,
            address: req.body.address,
            city: req.body.city,
            postal_code: req.body.postal_code,
            country: req.body.country,
            tags: req.body.tags,
            hours_of_operation_from: req.body.hours_of_operation_from,
            hours_of_operation_to: req.body.hours_of_operation_to,
            rating: req.body.rating,
            price_range: req.body.price_range,
            brand_logo: req.files.brand_logo
              ? req.files.brand_logo[0].filename
              : "",
            banner: req.files.banner ? req.files.banner[0].filename : "",
            menu: req.files.menu ? req.files.menu[0].filename : "",
            ambience: req.files.ambience ? req.files.ambience[0].filename : "",
            updated_at: Date.now(),
          },
          {
            new: true,
          }
        );

        return res.status(200).json({
          message: "Profile updated successfully",
          status: 200,
          success: true,
          baseURL: process.env.URL + "/uploads/MerchantUser/",
          data: profile,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong please try again later",
        status: 500,
        success: false,
      });
    }
  };
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/MerchantUser/"),
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,

  // fileFilter: imageFilter,
}).fields([
  {
    name: "brand_logo",
    maxCount: 1,
  },
  {
    name: "banner",
    maxCount: 1,
  },
  {
    name: "menu",
    maxCount: 1,
  },
  {
    name: "ambience",
    maxCount: 1,
  },
]);

module.exports = MerchantUserController;
