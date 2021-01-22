import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
function Footer() {
  const [list, setList] = useState({
    1: false,
    2: false,
    3: false,
    0: false,
  });
  return (
    <footer>
      <div className="section-wrapper">
        <div className="footer-section">
          <div className="section-title">
            <span>CUSTOMER SERVICE</span>
            <span onClick={() => setList({ ...list, 0: !list[0] })}>
              {list[0] ? "-" : "+"}
            </span>
          </div>
          <ul className={`footer-list ${list[0] && "open"} `}>
            <li className="footer-items">
              <Link to="/contact-us">contact us</Link>
            </li>
            <li className="footer-items">
              <Link to="/shipping">shipping</Link>
            </li>
            <li className="footer-items">
              <Link to="/return">returns</Link>
            </li>
            <li className="footer-items">
              <Link to="/track-your-order">track your orders</Link>
            </li>
            <li className="footer-items">
              <Link to="/contact-us">repair service guide</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <div className="section-title">
            <span>CUSTOMER SERVICE</span>
            <span onClick={() => setList({ ...list, 0: !list[1] })}>
              {list[1] ? "-" : "+"}
            </span>
          </div>
          <ul className={`footer-list ${list[1] && "open"} `}>
            <li className="footer-items">contact us</li>
            <li className="footer-items">shipping</li>
            <li className="footer-items">returns</li>
            <li className="footer-items">track your orders</li>
            <li className="footer-items">repair service guide</li>
          </ul>
        </div>
        <div className="footer-section">
          <div className="section-title">
            <span>LEGAL AREA</span>
            <span onClick={() => setList({ ...list, 2: !list[2] })}>
              {list[2] ? "-" : "+"}
            </span>
          </div>
          <ul className={`footer-list ${list[2] && "open"} `}>
            <li className="footer-items">
              <li className="term">
                <Link to="/terms">Terms & conditions</Link>
              </li>
            </li>
            <li className="footer-items">
              <Link to="/privacy_new">Privacy policy</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <div className="section-title">
            <span>FOLLOW US ON</span>
            <span onClick={() => setList({ ...list, 3: !list[3] })}>
              {list[3] ? "-" : "+"}
            </span>
          </div>
          <ul className={`footer-list ${list[3] && "open"} `}>
            <li className="footer-items">
              <Link to="/privacy_new">instagram</Link>
            </li>
            <li className="footer-items">
              <Link to="/privacy_new">facebook</Link>
            </li>
            <li className="footer-items">
              <Link to="/privacy_new">youtube</Link>
            </li>
            <li className="footer-items">
              <Link to="/privacy_new">twitter</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <div>© 2020 RADIUS ECOMMERCE</div>
        <div className="right">All rights reserved. RadiusE.Co., Ltd.</div>
      </div>
    </footer>
  );
}

export default Footer;
