const MerchantUser = require("../models/MerchantUser");
const jwt = require("jsonwebtoken");

const NotLoggedIn = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization == null)
      return res.status(401).send("please check authorization");
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    if (payload == null) return res.status(401).send("token is required");
    
    const user = await MerchantUser.findById(payload._id);
    if (!user) return res.status(401).send("user not found");
    req.id = payload.id;
    req.login_user = user;
    req.id = user;
  } catch (error) {
    console.log(error);
    return res.status(401).send("Something went wrong");
  }
  next();
};

module.exports = {
  NotLoggedIn,
};
