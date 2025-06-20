const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.json({ status: false, message: "Token expired" });
      }
      return res.json({ status: false });
    }

    try {
      const user = await User.findById(data.id);
      if (user) {
        return res.json({ status: true, user: user.username });
      } else {
        return res.json({ status: false });
      }
    } catch (error) {
      console.error("DB error:", error);
      return res.json({ status: false });
    }
  });
};
