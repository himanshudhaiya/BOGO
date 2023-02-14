const MerchantUser = require("../../models/MerchantUser");
const Adminauth = require("../../models/Adminauth");

class MerchantUserController {
  static list = async (req, res) => {
    try {
      const users = await MerchantUser.find();
      const admin = await Adminauth.find();
      return res.render("admin/merchantUser_list", { users, admin });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong please try again later" });
    }
  };

  static Approved = async (req, res) => {
    try {
      const data = req.body;

      await MerchantUser.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: MerchantUser.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "MerchantUser status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = MerchantUserController;
