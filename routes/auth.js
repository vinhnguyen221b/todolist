const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const pool = require("../db");
const validInfo = require("../middlewares/validInfo");
const jwtGenerate = require("../utils/jwtGenerator");
const auth = require("../middlewares/auth");
const { queryUser } = require("../utils/queryString");
const router = express.Router();

router.post("/register", validInfo, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await pool.query(queryUser.getUserByEmail, [email]);
    if (user.rows.length !== 0)
      return res.status(400).send("User already exists");
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const { rows } = await pool.query(queryUser.addUser, [name, email, hashed]);
    user = rows[0];
    const token = jwtGenerate(user.user_id);
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["user_name", "user_email"]));
  } catch (error) {
    next(error);
  }
});

router.post("/login", validInfo, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let { rows } = await pool.query(queryUser.getUserByEmail, [email]);
    if (rows.length === 0)
      return res.status(400).send("Invalid email or password");
    const { user_id, user_password } = rows[0];
    const valid = await bcrypt.compare(password, user_password);
    if (!valid) return res.status(400).send("Invalid email or password");
    const token = jwtGenerate(user_id);
    res.send(token);
  } catch (error) {
    next(error);
  }
});

router.get("/me", auth, async (req, res, next) => {
  try {
    const { rows } = await pool.query(queryUser.getUserInfo, [req.user.id]);
    if (!rows[0]) return res.status(404).send("Invalid user");
    res.send(rows[0]);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
