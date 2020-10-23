import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import authService from "../../service/authService";
import todoService from "../../service/todoService";

function InputTodo({ user, setTodoChange, categories, priorities }) {
  const [inputs, setInputs] = useState({
    description: "",
    category_id: 1,
    priority_id: 1,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputs.descriptiondescription === "") {
        toast.error("Please add description for new todo");
        return;
      }
      const body = { ...inputs };
      await todoService.addTodo(body);
      toast.success("Add todo successfully!");
      setInputs({ ...inputs, description: "" });
      setTodoChange(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    authService.logout();
    window.location = "/";
  };
  return (
    <div className="inputForm">
      <h2>
        {user.user_name}'s To do list{" "}
        <button className="btn logoutBtn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          id="description"
          value={inputs.description}
          onChange={(e) =>
            setInputs({ ...inputs, description: e.currentTarget.value })
          }
        />
        <div className="select-block d-flex flex-row justify-content-between">
          {" "}
          <select
            className="form-control"
            id="categorySelect"
            name="categories"
            onChange={(e) =>
              setInputs({ ...inputs, category_id: e.currentTarget.value })
            }
          >
            {categories.map((cate) => (
              <option
                key={cate.category_id}
                value={cate.category_id}
                style={{ color: cate.category_color }}
              >
                {cate.category_name}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            id="prioritySelect"
            name="priorities"
            onChange={(e) =>
              setInputs({ ...inputs, priority_id: e.currentTarget.value })
            }
          >
            {priorities.map((pri) => (
              <option
                key={pri.priority_id}
                value={pri.priority_id}
                style={{ color: pri.priority_color }}
              >
                {pri.priority_name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn addBtn">
          <i className="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
}

export default InputTodo;
