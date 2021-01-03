import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import axios from "../../../axios";
import { message } from "antd";
const SignUp1 = () => {
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    axios
      .get("/auth/signinW")
      .then((res) => {
        const { data } = res;
        if (!data.error) setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleLogin = async () => {
    axios
      .post("/auth/signin", user)
      .then((res) => {
        console.log(res);
        if (!res.data.error) {
          message.success("Login successful");
          setRedirect(true);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Aux>
      {redirect && <Redirect to="/dashboard/default" />}
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={handleOnChange}
                  value={user.email}
                  placeholder="Email"
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={handleOnChange}
                  className="form-control"
                  placeholder="password"
                />
              </div>
              <button
                onClick={handleLogin}
                className="btn btn-primary shadow-2 mb-4">
                Login
              </button>
              <p className="mb-2 text-muted">
                Forgot password?{" "}
                <NavLink to="/auth/reset-password-1">Reset</NavLink>
              </p>
              <p className="mb-0 text-muted">
                Don’t have an account?{" "}
                <NavLink to="/auth/signup">Signup</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default SignUp1;
