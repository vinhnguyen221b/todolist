import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import todoService from "../../service/todoService";
import Pagination from "./Pagination";
import paginate from "../../utils/paginate";
import TableRow from "./TableRow";

function ListTodos({ allTodos, setTodoChange, priorities }) {
  const pageSize = 4;
  const [todos, setTodos] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [filter, setFilter] = useState({
    priorities: 0,
    isdone: -1,
    query: "",
  });
  const handleDelete = async (id) => {
    try {
      const { data } = await todoService.removeTodo(id);
      toast.success(data);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error.response);
    }
  };
  const handlePageChange = (page) => {
    setPageIndex(page);
  };
  const filterData = (data) => {
    let filtered = data;

    if (filter.query) {
      filtered = filtered.filter((i) =>
        i.description.toLowerCase().startsWith(filter.query.toLowerCase())
      );
    }
    if (filter.priorities !== 0) {
      filtered = filtered.filter((i) => i.priority_id === filter.priorities);
    }
    if (filter.isdone !== -1) {
      filtered = filtered.filter((i) => i.isdone === filter.isdone);
    }
    return filtered;
  };
  useEffect(() => {
    console.log(filterData(allTodos));
    setTodos(filterData(allTodos));
  }, [allTodos, filter]);
  return (
    <>
      {/* {todos.length > 0 && filter.isdone !== true && (
        <p className="caption">
          There{" "}
          {todos.length > 1
            ? `are ${todos.filter((t) => t.isdone === false).length} things`
            : `is ${todos.filter((t) => t.isdone === false).length} thing`}
          need to be done 🔥
        </p>
      )} */}
      {/* {todos.length > 0 && filter.isdone === true && (
        <p className="caption">
          There{" "}
          {todos.length > 1
            ? `are ${todos.length} things`
            : `is ${todos.length} thing`}{" "}
          have been done 👏
        </p>
      )} */}
      <div className="filter">
        <span className="d-none d-md-inline">
          <i className="fas fa-filter"></i>
        </span>{" "}
        <select
          name="priorityFilter"
          id="priorityFilter"
          onChange={(e) =>
            setFilter({
              ...filter,
              priorities: parseInt(e.currentTarget.value, 10),
            })
          }
        >
          <option value={0} style={{ color: "black" }}>
            All priorities
          </option>
          {priorities.map((p) => (
            <option
              key={p.priority_id}
              value={p.priority_id}
              style={{ color: p.priority_color }}
            >
              {p.priority_name}
            </option>
          ))}
        </select>
        <select
          name="doneFilter"
          id="doneFilter"
          onChange={(e) =>
            setFilter({
              ...filter,
              isdone: JSON.parse(e.currentTarget.value),
            })
          }
        >
          <option value={-1} style={{ color: "black" }}>
            All task
          </option>
          <option value={true} style={{ color: "black" }}>
            Done
          </option>
          <option value={false} style={{ color: "black" }}>
            Not done
          </option>
        </select>
        <div className="search-bar">
          <span>
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            onChange={(e) =>
              setFilter({ ...filter, query: e.currentTarget.value })
            }
          />
        </div>
      </div>
      <table className="table table-striped tableTodo">
        <thead>
          <tr>
            <th scope="col" className="d-none d-md-table-cell">
              Type
            </th>
            <th style={{ textAlign: "left" }} scope="col">
              Description
            </th>
            <th style={{ textAlign: "left" }} scope="col">
              Priority
            </th>
            <th scope="col">Done</th>

            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr>
              <td colSpan="5">You have nothing to do now</td>
            </tr>
          )}
          {paginate(todos, pageIndex, pageSize).map((todo) => (
            <TableRow
              key={todo._id}
              todo={todo}
              handleDelete={handleDelete}
              setTodoChange={setTodoChange}
              priorities={priorities}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsCount={todos.length}
        pageSize={pageSize}
        pageIndex={pageIndex}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default ListTodos;
