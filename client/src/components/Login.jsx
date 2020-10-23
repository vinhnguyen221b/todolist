import React, { useState } from "react";
import auth from "../service/authService";
import Joi from "joi-browser";
import valid from "../utils/validate";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const { email, password } = inputs;

  const schema = {
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().min(6).required().label("Password"),
  };

  const handleChange = ({ currentTarget: input }) => {
    const newInputs = { ...inputs };
    newInputs[input.name] = input.value;
    setInputs(newInputs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    const errors = valid(inputs, schema);
    setError(errors);
    try {
      const token = await auth.login(body);
      if (!token) return toast.error("Invalid email or password");
      window.location = "/";
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-12">
          <div className="userForm">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                />
                {error && error.email && (
                  <div className="alert" role="alert">
                    {error.email}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  name="password"
                  onChange={handleChange}
                />
                {error && error.password && (
                  <div className="alert" role="alert">
                    {error.password}
                  </div>
                )}
              </div>
              <button type="submit" className="btn loginBtn">
                Login
              </button>
              <Link to="/" className="btn homeBtn">
                Home
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
