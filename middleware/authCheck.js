const jwt = require("jsonwebtoken");
require('dotenv').config()

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRECT_KEY, (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no token found" });
  }
};

module.exports = { requireAuth };
