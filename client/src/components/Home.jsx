import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-10 col-12">
        <div className="homepage">
          <div className="logo">
            <img src="./logo.png" alt="" />
          </div>
          <div className="slogan">LET DO IT!!!</div>
          <div className="description">
            <p style={{ textAlign: "center" }}>
              Don't be <strong>Busy</strong>, be <strong>Productive</strong>
            </p>
          </div>
          <div className="homeBtn">
            <Link className="btn btn-small btn-login" to="/login">
              Login
            </Link>
            <Link className="btn btn-small btn-register" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
