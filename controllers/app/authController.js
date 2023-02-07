const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const Otp = require("../../models/Otp");
const User = require("../../models/User");
const Notification = require("../../models/Notification");
require("dotenv");
const moment = require("moment");
const multer = require("multer");
const root = process.cwd();
const path = require("path");
const fs = require("fs");
const baseURL = process.env.URL;
const bcrypt = require("bcrypt");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/users"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,

  // fileFilter: imageFilter,
}).single("image");

class AuthController {
  // static login = async (req, res) => {
  //   const mobile_number = req.body.mobile_number;
  //   let msg = "Something went wrong please try again later";

  //   var mobile_regex = /^\d{10}$/;

  //   if (!mobile_regex.test(mobile_number)) {
  //     return res.status(401).send("Invalid Mobile Number");
  //   }

  //   try {
  //     let user = await User.findOne({ mobile_number });
  //     if (!user) {
  //       user = User({
  //         mobile_number,
  //       });
  //       user = await user.save();
  //     }

  //     let newOtp = await otpGenerator.generate(4, {
  //       alphabets: false,
  //       upperCase: false,
  //       specialChars: false,
  //     });
  //     if (mobile_number == "8952829519") {
  //       newOtp = 1234;
  //     }

  //     //newOtp = 1234;
  //     let customerMobile = user.mobile_number;
  //     sendSMS(customerMobile, newOtp);

  //     const otpExist = await Otp.findOne({
  //       user,
  //     });

  //     if (otpExist) {
  //       await Otp.findOneAndUpdate(
  //         {
  //           _id: otpExist._id,
  //         },
  //         {
  //           otp: newOtp,
  //           update_at: Date.now(),
  //         }
  //       );
  //     } else {
  //       const otp = Otp({
  //         user,
  //         otp: newOtp,
  //         created_at: Date.now(),
  //         update_at: Date.now(),
  //       });
  //       await otp.save();
  //     }
  //     return res.send("Otp Sent Successfully");
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(401).send(msg);
  //   }
  // };

  // static otp_verify = async (req, res) => {
  //   let msg = "Something went wrong please try again later";
  //   try {
  //     const { mobile_number, otp } = req.body;

  //     const user = await User.findOne({ mobile_number });

  //     if (!user) return res.status(404).send("User not found");

  //     const userOtp = await Otp.findOne({ user });
  //     let is_registered = 0;
  //     if (user && user.mobile_number && user.mobile_number != "") {
  //       is_registered = 1;
  //     }

  //     if (otp == userOtp.otp) {
  //       //create and assign a token
  //       const token = jwt.sign(
  //         {
  //           _id: user._id,
  //         },
  //         process.env.TOKEN_SECRET
  //       );
  //       let returnData = {
  //         token: token,
  //         is_registered: is_registered,
  //       };

  //       return res.send(returnData);
  //     }

  //     return res.status(401).send("Invalid otp");
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(401).send(msg);
  //   }
  // };

  // static register = async (req, res) => {
  //   let msg = "Something went wrong please try again later";
  //   try {
  //     var token = req.body.token;
  //     var registerData = req.body.registerData;
  //     registerData = JSON.parse(registerData);
  //     const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  //     const user = await User.findById(payload._id);
  //     if (!user) return res.status(401).send("User not found");

  //     await User.findByIdAndUpdate(user._id, registerData);
  //     let returnObj = {
  //       message: "User Registered Success",
  //       statusCode: 200,
  //     };

  //     // sending notification start
  //     const notification = Notification({
  //       user: req.id,
  //       type: "User Registered",
  //       data: {
  //         time: Date.now(),
  //       },
  //     });
  //     await notification.save();
  //     if (req.app.socket) req.app.socket.emit("User Registered");

  //     // sending notification end
  //     // await sendEmail(
  //     //   registerData.email,
  //     //   " Thankyou for registration " + registerData.name
  //     // );
  //     res.send(returnObj);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(401).send(msg);
  //   }
  // };

  // static editProfile = async (req, res) => {
  //   try {
  //     upload(req, res, async function (err) {
  //       var token = req.body.token;
  //       const payload = jwt.decode(token, process.env.TOKEN_SECRET);

  //       const user = await User.findById(payload._id);
  //       if (!user) return res.status(401).send("User not found");

  //       const data = req.body;
  //       const profile = await User.findByIdAndUpdate(user._id, {
  //         image: req.file ? req.file.filename : "",
  //         first_name: data.first_name,
  //         last_name: data.last_name,
  //         dob: data.dob,
  //         dob_time: data.dob_time,
  //         gender: data.gender,
  //         city: data.city,
  //         state: data.state,
  //       });

  //       await profile.save();
  //       // sending notification start
  //       const notification = Notification({
  //         user: req.id,
  //         type: "Profile Updated",
  //         data: {
  //           time: Date.now(),
  //         },
  //       });
  //       await notification.save();
  //       if (req.app.socket) req.app.socket.emit("Profile Updated");

  //       // sending notification end
  //       return res.send("profile Update successfully");
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send("Something went wrong");
  //   }
  // };

  static get_user_profile = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      var token = req.body.token;

      const payload = jwt.decode(token, process.env.TOKEN_SECRET);
      const user = await User.findById(payload._id);
      if (!user) return res.status(401).send("User not found");

      res.send(user);
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };

  static user_register = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      let name = req.body.name;
      let email = req.body.email;
      let password = req.body.password;
      if (name == "") {
        return res.status(400).json({ message: "Name is required" });
      } else if (email == "") {
        return res.status(400).json({ message: "Email is required" });
      } else if (password == "") {
        return res.status(400).json({ message: "Password is required" });
      }
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hash = await bcrypt.hash(password, salt);
      // return console.log(hash)

      const user = new User({
        name: name,
        email: email,
        password: hash,
      });
      await user.save();
      return res.status(200).json({
        message: "User Register successfully",
        status: 200,
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };

  static user_login = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      let email = req.body.email;
      let password = req.body.password;

      if (email == "") {
        return res.status(400).json({ message: "Email is required" });
      }
      if (password == "") {
        return res.status(400).json({ message: "Password is required" });
      }

      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      return res.status(200).json({
        message: "User login successfully",
        status: 200,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };
}

module.exports = AuthController;

function sendSMS(mobileNo, OTP) {
  let theUrl = `http://sms.smsinsta.in/vb/apikey.php?apikey=1158c647754664171463&senderid=SMSINS&templateid=1207162019695960917&route=3&number=${mobileNo}&message=Your OTP is ${OTP}. Regards SMSINSTA`;
  const request = require("request");

  request(theUrl, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    return body;
  });
}
