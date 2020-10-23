import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "./service/authService";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Home from "./components/Home";

toast.configure();
function App() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    setCurrentUser(auth.getCurrentUser());
  }, []);
  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) =>
            currentUser ? <Redirect to="/" /> : <Login {...props} />
          }
        />
        <Route
          exact
          path="/register"
          render={(props) =>
            currentUser ? <Redirect to="/" /> : <Register {...props} />
          }
        />
        <Route
          exact
          path="/"
          render={(props) =>
            !currentUser ? <Home /> : <Dashboard {...props} />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
