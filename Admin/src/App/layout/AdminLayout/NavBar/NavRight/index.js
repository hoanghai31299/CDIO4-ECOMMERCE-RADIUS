import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from "../../../../../assets/images/user/avatar-2.jpg";
import UserContext from "../../../../../Pages/UserContext";
import axios from "../../../../../axios";
import { useHistory } from "react-router-dom";
function NavRight(props) {
  const { admin } = useContext(UserContext);
  const history = useHistory();
  const handleSignout = () => {
    axios.get("/auth/signout").then((res) => {
      history.push("/admin/auth/signin");
    });
  };
  return (
    <Aux>
      <ul className="navbar-nav ml-auto">
        <li>
          <Dropdown alignRight={!props.rtlLayout} className="drp-user">
            <Dropdown.Toggle variant={"link"} id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className="profile-notification">
              <div className="pro-head">
                <img src={Avatar1} className="img-radius" alt="User Profile" />
                <span>{admin ? admin.name : "Hello"}</span>
                <a
                  onClick={handleSignout}
                  href={DEMO.BLANK_LINK}
                  className="dud-logout"
                  title="Logout">
                  <i className="feather icon-log-out" />
                </a>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </Aux>
  );
}

export default NavRight;
