import React from "react";
import { useState } from "react";
import Checkbox from "./Checkbox";
import EditTodo from "./EditTodo";
function TableRow({ todo, handleDelete, priorities, setTodoChange }) {
  const [isChecked, setIsChecked] = useState(todo.isdone);
  return (
    <tr
      key={todo.todo_id}
      style={{
        background:
          isChecked && "linear-gradient(to right, #292e49, #536976, #bbd2c5)",
      }}
    >
      <td className="d-none d-md-table-cell">
        <i className={todo.category_icon}></i>
      </td>
      <td
        style={{
          textAlign: "left",
          textDecoration: isChecked ? "line-through" : "none",
        }}
      >
        {todo.description}
      </td>
      <td
        className="d-none d-md-table-cell"
        style={{
          textAlign: "left",
          color: `${todo.priority_color}`,
          textDecoration: isChecked ? "line-through" : "none",
        }}
      >
        {todo.priority_name}
      </td>
      <td
        className="d-table-cell d-md-none cellPriorityIcon"
        style={{ textAlign: "left", color: `${todo.priority_color}` }}
      >
        <i className={todo.priority_icon}></i>
      </td>
      <td>
        <Checkbox
          id={todo.todo_id}
          done={todo.isdone}
          setStatus={setIsChecked}
        />
      </td>

      <td>
        <EditTodo
          todo={todo}
          setTodoChange={setTodoChange}
          priorities={priorities}
          disable={isChecked}
        />
        <button
          className="btn btn-small btn-danger mx-2"
          onClick={() => handleDelete(todo.todo_id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
