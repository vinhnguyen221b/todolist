const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerate(id) {
  const token = jwt.sign({ id }, process.env.jwtSecureKey, {
    expiresIn: "1hr",
  });
  return token;
}

module.exports = jwtGenerate;
