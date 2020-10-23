import React, { useState } from "react";
import { toast } from "react-toastify";
import todoService from "../../service/todoService";

function EditTodo({ todo, setTodoChange, priorities, disable }) {
  const [inputs, setInputs] = useState({
    description: todo.description,
    priority_id: todo.priority_id,
  });
  const handleEdit = async (id) => {
    try {
      const body = { ...inputs };
      const { data } = await todoService.updateTodo(id, body);
      toast.success(data);
      setTodoChange(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-warning mx-2"
        data-toggle="modal"
        data-target={`#modal${todo.todo_id}`}
        disabled={disable}
      >
        <i className="fas fa-edit"></i>
      </button>

      <div
        className="modal fade"
        id={`modal${todo.todo_id}`}
        tabIndex="-1"
        aria-labelledby={`modal${todo.todo_id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <input
                type="text"
                name="editDesc"
                defaultValue={todo.description}
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.currentTarget.value })
                }
              />
              <select
                className="form-control editSelect"
                id="editPriority"
                name="priorities"
                onChange={(e) =>
                  setInputs({ ...inputs, priority_id: e.currentTarget.value })
                }
                value={todo.priority_id}
              >
                {priorities.map((pri) => (
                  <option
                    key={pri.priority_id}
                    value={pri.priority_id}
                    style={{ color: pri.priority_color }}
                    // selected={
                    //   pri.priority_id === todo.priority_id ? true : false
                    // }
                  >
                    {pri.priority_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => handleEdit(todo.todo_id)}
              >
                <i className="fas fa-save"></i>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() =>
                  setInputs({ ...inputs, description: todo.description })
                }
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;
