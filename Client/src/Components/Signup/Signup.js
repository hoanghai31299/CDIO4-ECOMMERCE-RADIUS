import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Signup.css";
function Signup() {
  const [accountInfo, setAccountInfor] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    cfpassword: "",
  });
  const [validate, setValidate] = useState({
    err: false,
    message: "",
  });
  const [notification, setNotification] = useState(undefined);
  useEffect(() => {
    axios.post();
  }, []);
  const handleOnChange = (e) => {
    setAccountInfor({
      ...accountInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountInfo.cfpassword === accountInfo.password) {
      setValidate({
        err: false,
        message: "",
      });
      axios
        .post(`/auth/signup`, {
          name: accountInfo.name,
          email: accountInfo.email,
          phone: accountInfo.phone,
          address: accountInfo.address,
          password: accountInfo.password,
        })
        .then((res) => {
          setNotification(res.data);
          console.log("res.data.............", res.data);
        })
        .catch((err) => {
          setAccountInfor("errrrrrrrrrrrrr", err.respose.data);
        });
      setAccountInfor({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        cfpassword: "",
      });
    } else {
      setValidate({
        err: true,
        message: "Password and Password Comfirm must be math !!",
      });
    }
  };
  return (
    <div class="signup-container">
      <form class="signup-form">
        <div class="title">
          <h4>CREATE ACCOUNT</h4>
        </div>
        <div class="form-body">
          <div class="form-items">
            <div class="form-label">Email Adress</div>
            <div class="form-input">
              <input
                type="email"
                name="email"
                value={accountInfo.email}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div class="form-items">
            <div class="form-label">Full name</div>
            <div class="form-input">
              <input
                type="text"
                name="name"
                value={accountInfo.name}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div class="form-items">
            <div class="form-label">Password</div>
            <div class="form-input">
              <input
                type="password"
                name="password"
                value={accountInfo.password}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div class="form-items">
            <div class="form-label">Confirm Password</div>
            <div class="form-input">
              <input
                type="password"
                name="cfpassword"
                value={accountInfo.cfpassword}
                onChange={handleOnChange}
              />
              {validate.err ? (
                <label className="err-cfpassword">{validate.message}</label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="form-items">
            <div class="form-label">Phone</div>
            <div class="form-input">
              <input
                type="text"
                name="phone"
                value={accountInfo.phone}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div class="form-items">
            <div class="form-label">Address</div>
            <div class="form-input">
              <input
                type="text"
                name="address"
                value={accountInfo.address}
                onChange={handleOnChange}
              />
            </div>
          </div>
          {notification === undefined ? (
            ""
          ) : (
            <div className="notification">{notification.message}</div>
          )}
        </div>

        <button class="btns" onClick={handleSubmit}>
          CREATE ACCOUNT
        </button>
      </form>
    </div>
  );
}

export default Signup;
