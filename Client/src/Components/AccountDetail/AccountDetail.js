import React from "react";
import "./AccountDetail.css";
function AccountDetail() {
  return (
    <div>
      <div className="container">
        <div className="form-myaccount">
          <ul className="myaccount-list">
            <li className="my_account-list__item title-myaccount">
              <a className="item-link myaccount">My account</a>
            </li>
            <div className="myaccount-name_page">Account Details</div>
            <li className="my_account-list__item item">
              <a className="item-link">Order History</a>
            </li>
            <li className="my_account-list__item item">
              <a className="item-link">Account Details</a>
            </li>
            <li className="my_account-list__item item">
              <a className="item-link">Log Out</a>
            </li>
          </ul>
        </div>
        <div className="form-accountdetail">
          <div className="account_detail-title">Account details</div>
          <div className="account_detail-email">
            <lable className="item-title">Email address</lable>
            <br />
            <input type="email" className="ip-max_with"></input>
          </div>
          <div className="account_detail-name">
            <div className="account_detail-name__first_name">
              <lable className="item-title">First name</lable>
              <br />
              <input type="text"></input>
            </div>
            <div className="account_detail-name__last_name">
              <lable className="item-title">Last name</lable>
              <br />
              <input type="text" className=""></input>
            </div>
          </div>

          <div className="account_detail-country">
            <lable className="item-title">Address</lable>
            <br />
            <input type="text" className="ip-max_with"></input>
          </div>

          <div className="account_detail-phonenumber">
            <lable className="item-title">Phone number</lable>
            <br />
            <div className="phone_number-input">
              <input type="text" value=" +84" />
              <input type="text" />
            </div>
          </div>
          <div className="account_detail-pivate_seting">
            <lable className="item-title">Privacy Settings</lable>
            <br />
            <input type="checkbox" name="checkbox_recive" />
            <label for="checkbox_recive">
              I would like to receive Gentle Monster newsletter
            </label>
          </div>
          <div className="account_detail-button">
            <button className="save_changes">Save Changes</button>
            <button className="change_password">Change Pasword</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetail;
