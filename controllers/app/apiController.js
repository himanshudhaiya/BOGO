const Category = require("../../models/Category");
const About = require("../../models/About");
const Contact = require("../../models/Contact");
const Faq = require("../../models/Faq");
const PrivacyPolicy = require("../../models/PrivacyPolicy");
const TermsCondition = require("../../models/TermsCondition");
const User = require("../../models/User");
const Notification = require("../../models/Notification");

class ApiController {
  static about = async (req, res) => {
    try {
      const data = await About.find({});
      // sending notification start
      const notification = Notification({
        type: "Aboutus-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Aboutus-added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static contact = async (req, res) => {
    try {
      const data = await Contact.find({});
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static faq = async (req, res) => {
    try {
      const data = await Faq.find();
      // sending notification start
      const notification = Notification({
        type: "Faq-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Faq-added");

      // sending notification end
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static privacypolicy = async (req, res) => {
    try {
      const data = await PrivacyPolicy.find({});
      // sending notification start
      const notification = Notification({
        type: "PrivacyPolicy-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("PrivacyPolicy-added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static termscondition = async (req, res) => {
    try {
      const data = await TermsCondition.find({});
      // sending notification start
      const notification = Notification({
        type: "termscondition-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("termscondition-added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static users = async (req, res) => {
    try {
      const users = await User.find({});
      return res.send(users);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static category = async (req, res) => {
    try {
      const category = await Category.find({});
      return res.send(category);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = ApiController;
