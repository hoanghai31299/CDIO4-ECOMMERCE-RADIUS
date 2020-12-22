import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
function Signin() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const hanleInputChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  return (
    <div className="container-login">
      <div className="login-form-container">
        <div className="login-title">
          <span>Login</span>
          <p>Returning Customer? Sign in to your account.</p>
        </div>
        <div className="login-form">
          <div class="input-box">
            <p class="input-label">Email</p>
            <input
              type="email"
              maxLength={100}
              id="email"
              required
              value={info.email}
              onChange={hanleInputChange}
              maxlength="100"
            />
          </div>
          <div class="input-box">
            <p class="input-label">Password</p>
            <input
              type="password"
              maxLength={100}
              id="password"
              required
              value={info.password}
              onChange={hanleInputChange}
              maxlength="50"
            />
          </div>
          <div className="find-pw">
            <Link to="/find-password">Find My Password</Link>
          </div>
          <div className="btns">
            <button className="login_bt black">LOGIN</button>
          </div>
        </div>
      </div>
      <div className="register-wrapper">
        <div className="register-title">
          <span>CREATE AN ACCOUNT</span>
          <p>
            By creating an account with Gentle Monster, you will be able to
            check your orders, edit and save shipping preferences, and create
            your wish list among other benefits.
          </p>
        </div>
        <div className="btns">
          <button className="login_bt black">
            <Link className="link" to="/signup">
              CREATE ACCOUNT
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
