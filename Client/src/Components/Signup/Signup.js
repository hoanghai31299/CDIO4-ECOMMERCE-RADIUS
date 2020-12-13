import React from "react";
import "../Signin/Signin.css";
function Signup() {
  return (
    <div>
      <form method="POST" className="form" id="form-1">
        <h3 className="heading">Thành viên đăng ký</h3>

        <div className="spacer"></div>

        <div className="form-group">
          <label for="fullname" className="form-label">
            Tên đầy đủ
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="VD: Sơn Đặng"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

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

        <div className="form-group">
          <label for="password_confirmation" className="form-label">
            Nhập lại mật khẩu
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Nhập lại mật khẩu"
            type="password"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <button className="form-submit">Đăng ký</button>
      </form>
    </div>
  );
}

export default Signup;
