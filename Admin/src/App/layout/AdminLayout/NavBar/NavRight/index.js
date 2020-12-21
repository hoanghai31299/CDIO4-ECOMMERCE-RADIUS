import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from "../../../../../assets/images/user/avatar-1.jpg";

class NavRight extends Component {
  state = {
    listOpen: false,
  };

  render() {
    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <img
                    src={Avatar1}
                    className="img-radius"
                    alt="User Profile"
                  />
                  <span>John Doe</span>
                  <a
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
}

export default NavRight;
