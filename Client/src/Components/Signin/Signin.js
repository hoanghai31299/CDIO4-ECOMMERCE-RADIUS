import React, { useState, useEffect } from "react";
import "./Signin.css";
function Signin() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState({ email: false, password: false });

  useEffect(() => {}, [emailInput, passwordInput]);
  const validateEmail = () => {
    const reg = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    if (!emailInput.match(reg)) setError({ ...error, email: true });
    else setError({ ...error, email: false });
  };
  const validatePassword = () => {
    if (passwordInput.length <= 6) setError({ ...error, password: true });
    else setError({ ...error, password: false });
  };
  return (
    <div>
      <form action="" method="POST" className="form" id="form-2">
        <h3 className="heading">Đăng nhập</h3>

        <div className="spacer"></div>

        <div className="form-group">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            onFocus={(e) => setError({ ...error, email: false })}
            onChange={(e) => setEmailInput(e.target.value)}
            onBlur={validateEmail}
            id="email"
            name="email"
            type="text"
            placeholder="VD: email@domain.com"
            className="form-control"
          />

          {error.email && (
            <span className="form-message">Email is invalid</span>
          )}
        </div>

        <div className="form-group">
          <label for="password" className="form-label">
            Mật khẩu
          </label>
          <input
            onFocus={(e) => setError({ ...error, password: false })}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            onBlur={validatePassword}
            id="password"
            name="password"
            type="password"
            placeholder="Nhập mật khẩu"
            className="form-control"
          />
          {error.password && (
            <span className="form-message">
              Password is more than 6 characters
            </span>
          )}
        </div>

        <button className="form-submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Signin;
