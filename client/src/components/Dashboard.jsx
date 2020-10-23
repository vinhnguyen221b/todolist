import React, { useEffect, useState } from "react";
import authService from "../service/authService";
import todoService from "../service/todoService";
import InputTodo from "./TodoList/InputTodo";
import ListTodos from "./TodoList/ListTodos";

function Dashboard(props) {
  const [user, setUser] = useState({});
  const [allTodos, setAllTodos] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allPriorities, setAllPriorities] = useState([]);
  const [todoChange, setTodoChange] = useState(false);

  const getTodos = async () => {
    try {
      const { data: todos } = await todoService.getTodos();
      setAllTodos(todos);
    } catch (error) {
      console.log(error);
    }
  };

  const getType = async () => {
    try {
      const { data: cates } = await todoService.getCategories();
      const { data: priors } = await todoService.getPriorities();
      setAllCategories(cates);
      setAllPriorities(priors);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await authService.getUserInfo();
        setUser(data);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        window.location = "/";
      }
    };
    getUser();
    getTodos();
    getType();
    setTodoChange(false);
  }, [todoChange]);
  return (
    <>
      <InputTodo
        user={user}
        setTodoChange={setTodoChange}
        categories={allCategories}
        priorities={allPriorities}
      />
      <ListTodos
        allTodos={allTodos}
        setTodoChange={setTodoChange}
        priorities={allPriorities}
      />
    </>
  );
}

export default Dashboard;
