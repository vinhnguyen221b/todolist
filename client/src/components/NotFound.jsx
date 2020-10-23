import React from "react";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-10 col-12">
        <div className="homepage">
          <div className="logo">
            <img src="./notfound.png" alt="" />
          </div>
          <div className="slogan">Opps! Nothing here!</div>

          <div className="homeBtn">
            <Link className="btn btn-small btn-login" to="/">
              HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
