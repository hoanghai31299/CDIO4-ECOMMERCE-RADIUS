import React from "react";
import "./Signin.css";
function Signin() {
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
            id="email"
            name="email"
            type="text"
            placeholder="VD: email@domain.com"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <div className="form-group">
          <label for="password" className="form-label">
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Nhập mật khẩu"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <button className="form-submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Signin;
