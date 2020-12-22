import React from "react";
import "./Signup.css";
function Signup() {
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
              <input type="email" />
            </div>
          </div>
          <div class="form-items">
            <div class="form-label">Password</div>
            <div class="form-input">
              <input type="password" />
            </div>
          </div>
          <div class="form-items">
            <div class="form-label">Confirm Password</div>
            <div class="form-input">
              <input type="password" />
            </div>
          </div>
          <div class="form-items">
            <div class="form-label">Phone</div>
            <div class="form-input">
              <input type="text" />
            </div>
          </div>
          <div class="form-items">
            <div class="form-label">Adress</div>
            <div class="form-input">
              <input type="text" />
            </div>
          </div>
        </div>

        <button class="btns">CREATE ACCOUNT</button>
      </form>
    </div>
  );
}

export default Signup;
