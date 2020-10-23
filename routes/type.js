const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/categories", async (req, res, next) => {
  try {
    const data = await pool.query("SELECT * FROM catergories");
    res.send(data.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/priorities", async (req, res, next) => {
  try {
    const data = await pool.query("SELECT * FROM priorities");
    res.send(data.rows);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
