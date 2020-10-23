const jwt = require("jsonwebtoken");
require("dotenv").config();
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied! No token provided");
  try {
    const payload = jwt.verify(token, process.env.jwtSecureKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
}

module.exports = auth;
