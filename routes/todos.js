const express = require("express");
const pool = require("../db");
const router = express.Router();
const auth = require("../middlewares/auth");
const { queryTodo } = require("../utils/queryString");

router.get("/", auth, async (req, res, next) => {
  try {
    const user = await pool.query(queryTodo.getAllTodos, [req.user.id]);
    res.send(user.rows);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { description, category_id, priority_id } = req.body;
    const newTodo = await pool.query(queryTodo.addTodo, [
      req.user.id,
      description,
      false,
      category_id,
      priority_id,
    ]);
    res.send(newTodo.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { description, category_id, priority_id } = req.body;
    // const query =
    //   "UPDATE todos SET description = $1, priority_id=$2 WHERE user_id = $3 AND todo_id = $4 RETURNING *";
    const updatedTodo = await pool.query(queryTodo.updateTodo, [
      description,
      priority_id,
      req.user.id,
      req.params.id,
    ]);
    if (updatedTodo.rows.length === 0)
      return res.status(400).send("Invalid todo");
    res.send("Update successfully!!");
  } catch (error) {
    next(error);
  }
});

router.put("/check/:id", auth, async (req, res, next) => {
  try {
    const { rows } = await pool.query(queryTodo.getOneTodo, [
      req.params.id,
      req.user.id,
    ]);
    const isDone = rows[0].isdone;
    const update = !isDone;
    await pool.query(queryTodo.checkTodo, [!isDone, req.params.id]);
    res.send(update);
  } catch (ex) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const todo = await pool.query(queryTodo.deleteTodo, [
      req.params.id,
      req.user.id,
    ]);
    if (todo.rows.length === 0) return res.status(400).send("Invalid todo");
    res.send("Todo was deleted");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
