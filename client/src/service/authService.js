import http from "./httpService";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
const apiEndPoint = "/auth/";

http.setJwt(getJwt());

export async function login({ email, password }) {
  try {
    const { data: jwt } = await http.post(apiEndPoint + "login", {
      email,
      password,
    });
    localStorage.setItem(tokenKey, jwt);
    return jwt;
  } catch (error) {
    return null;
  }
}

export function register({ name, email, password }) {
  return http.post(apiEndPoint + "register", { name, email, password });
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}
export function getUserInfo() {
  return http.get(apiEndPoint + "me");
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  getUserInfo,
  register,
};
