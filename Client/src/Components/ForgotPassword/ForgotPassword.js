import React from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
function ForgotPassword() {
  return (
    <div className="forgot-password">
      <div className="forgot-password__form">
        <div className="forgot-password__title element-form ">
          Forgot your password ?
        </div>
        <div className="forgot-password__decription element-form">
          Enter your email address and we'll send you a link to reset your
          password.
        </div>
        <div className="forgot-password__input element-form ">
          <input placeholder="Email address" type="email" />
        </div>
        <div className="forgot-password_button element-form">
          <div className="button-backtosigin button">
            <Link to="/signin">BACK</Link>
          </div>
          <div className="button-reset button">RESET</div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
