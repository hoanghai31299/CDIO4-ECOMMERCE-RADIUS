import React, { useContext, useState } from "react";
import "./Signin.css";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../GlobalState/UserContext";
function Signin() {
  const { setUser } = useContext(UserContext);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [err, setErr] = useState({
    err: false,
    message: "",
  });

  const handleOnSubmit = (e) => {
    axios
      .post("/auth/signin", info, { withCredentials: true })
      .then((response) => {
        if (response.data.error === true) {
          setErr({ err: true, message: response.data.message });
        } else {
          setUser(response.data.user);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        <div className="message-error">{err.message}</div>
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
            <button onClick={handleOnSubmit} className="login_bt black">
              LOGIN
            </button>
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
