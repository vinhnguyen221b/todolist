import http from "./httpService";
const apiEndPoint = "/todos";
const apiEndPoint_type = "/type/";

export async function getTodos() {
  return await http.get(apiEndPoint);
}
export async function addTodo(todo) {
  return await http.post(apiEndPoint, todo);
}

export async function checkDone(id) {
  return await http.put(apiEndPoint + "/check/" + id);
}
export async function updateTodo(id, todo) {
  return await http.put(apiEndPoint + "/" + id, todo);
}
export async function removeTodo(id) {
  return await http.delete(apiEndPoint + "/" + id);
}

export async function getCategories() {
  return await http.get(apiEndPoint_type + "categories");
}

export async function getCategoryById(id) {
  return await http.get(apiEndPoint_type + "categories/" + id);
}

export async function getPriorities() {
  return await http.get(apiEndPoint_type + "priorities");
}

export async function getPriorityById(id) {
  return await http.get(apiEndPoint_type + "priorities/" + id);
}

export default {
  addTodo,
  updateTodo,
  getTodos,
  removeTodo,
  checkDone,
  getCategories,
  getCategoryById,
  getPriorities,
  getPriorityById,
};
