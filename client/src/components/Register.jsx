import React, { useState } from "react";
import auth from "../service/authService";
import valid from "../utils/validate";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register(props) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const { email, name, password } = inputs;

  const schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().min(6).required().label("Password"),
  };
  const handleChange = (e) => {
    const newUser = { ...inputs };
    newUser[e.currentTarget.name] = e.currentTarget.value;
    setInputs(newUser);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      email,
      password,
    };
    const errors = valid(inputs, schema);
    setError(errors);
    try {
      const response = await auth.register(body);

      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-12">
          <div className="userForm">
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="registerName">Your name</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerName"
                  name="name"
                  onChange={handleChange}
                />
                {error && error.name && (
                  <div class="alert" role="alert">
                    {error.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="registerEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                />
                {error && error.email && (
                  <div class="alert" role="alert">
                    {error.email}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="registerPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  name="password"
                  onChange={handleChange}
                />
                {error && error.password && (
                  <div class="alert" role="alert">
                    {error.password}
                  </div>
                )}
              </div>
              <button type="submit" className="btn loginBtn">
                Submit
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

export default Register;
