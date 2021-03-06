import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading.js";
import { Link, useHistory } from "react-router-dom";
import "./AccountDetail.css";
import axios from "../../axios";
function AccountDetail() {
  const [loading, setLoading] = useState();
  const [inforUser, setInforUser] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    axios
      .get("/auth/signinW")
      .then((res) => {
        setInforUser({ ...inforUser, ...res.data.user });
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleChange = (e) => {
    setInforUser({
      ...inforUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSummit = () => {
    axios.put(`/user/${inforUser._id}`, {
      _id: inforUser._id,
      name: inforUser.name,
      email: inforUser.email,
      phone: inforUser.phone,
      address: inforUser.address,
    });
  };
  const handleLogout = () => {
    axios
      .get(`/auth/signout`)
      .then((res) => {
        history.go(0);
      })
      .catch((err) => {
        history.go(0);
      });
  };
  return (
    <div>
      <div className="container">
        <div className="form-myaccount">
          <div className="myaccount-list">
            <div className="my_account-list__item title-myaccount">
              <a className="item-link myaccount">My account</a>
            </div>
            <div className="myaccount-name_page">Account Details</div>
            <div className="my_account-list__item item">
              <Link to="/track-your-order">
                <a className="item-link">Order History</a>
              </Link>
            </div>
            <div className="my_account-list__item item"></div>
            <div className="my_account-list__item item">
              <Link to="/">
                <a className="item-link" onClick={handleLogout}>
                  Log Out
                </a>
              </Link>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="form-accountdetail">
            <Loading />
          </div>
        ) : (
          <div className="form-accountdetail">
            <div className="account_detail-title">Account details</div>
            <div className="account_detail-email">
              <lable className="item-title" name="email">
                Email address
              </lable>
              <br />
              <input
                type="email"
                className="ip-max_with"
                name="email"
                value={inforUser.email}
                onChange={handleChange}
              ></input>
            </div>
            <div className="account_detail-name">
              <div className="account_detail-name__first_name">
                <lable className="item-title">Full name</lable>
                <br />
                <input
                  type="text"
                  id="username"
                  value={inforUser.name}
                  name="name"
                  onChange={handleChange}
                ></input>
              </div>
              {/* <div className="account_detail-name__last_name">
              <lable className="item-title">Last name</lable>
              <br />
              <input type="text" className="" onChange={handleChange}></input>
            </div> */}
            </div>

            <div className="account_detail-country">
              <lable className="item-title">Address</lable>
              <br />
              <input
                type="text"
                className="ip-max_with"
                name="address"
                value={inforUser.address}
                onChange={handleChange}
              ></input>
            </div>

            <div className="account_detail-phonenumber">
              <lable className="item-title">Phone number</lable>
              <br />
              <div className="phone_number-input">
                <input
                  type="text"
                  name="phone"
                  value={inforUser.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="account_detail-pivate_seting">
              {/* <lable className="item-title">Privacy Settings</lable>
              <br />
              <input type="checkbox" name="checkbox_recive" />
              <label for="checkbox_recive">
                I would like to receive Gentle Monster newsletter
              </label> */}
            </div>
            <div className="account_detail-button">
              <button className="save_changes" onClick={handleSummit}>
                Save Changes
              </button>
              <button className="change_password">Change Pasword</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountDetail;
