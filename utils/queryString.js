const getAllTodos = ` SELECT todo_id, description, isdone, c.category_id, c.category_icon, p.priority_id, p.priority_name, p.priority_color, p.priority_icon
                FROM users AS u  
                INNER JOIN todos AS t 
                ON u.user_id = t.user_id 
                INNER JOIN catergories as c
                ON c.category_id = t.category_id
                INNER JOIN priorities as p
                ON p.priority_id = t.priority_id
                WHERE u.user_id = $1`;
const getOneTodo =
  "SELECT isDone FROM todos WHERE todo_id = $1 AND user_id =$2";
const addTodo =
  "INSERT INTO todos (user_id, description, isdone,category_id,priority_id) VALUES($1, $2, $3, $4, $5) RETURNING *";
const updateTodo =
  "UPDATE todos SET description = $1, priority_id=$2 WHERE user_id = $3 AND todo_id = $4 RETURNING *";
const checkTodo = "UPDATE todos SET isDone = $1 WHERE todo_id = $2 RETURNING *";
const deleteTodo =
  "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *";

const getUserByEmail = "SELECT * FROM users WHERE user_email=$1";
const addUser =
  "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *";
const getUserInfo =
  "SELECT user_name, user_email FROM users WHERE user_id = $1";

const queryTodo = {
  getAllTodos,
  getOneTodo,
  addTodo,
  updateTodo,
  checkTodo,
  deleteTodo,
};

const queryUser = {
  addUser,
  getUserInfo,
  getUserByEmail,
};

module.exports = {
  queryTodo,
  queryUser,
};
