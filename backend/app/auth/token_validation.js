const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    console.log("token valid");
    let token = req.get("Authorization");
    console.log("token: "+token);
    if (token) {
      // Remove Bearer from string
      //token = token.slice(7);
      jwt.verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User!"
      });
    }
  }
};
