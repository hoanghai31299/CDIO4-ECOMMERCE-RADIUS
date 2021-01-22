import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import axios from "../../axios";
import { UserContext } from "../../GlobalState/UserContext";
import Notification from "../Notification/Notification";
function Header() {
  const [isNotification, setIsNotification] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(undefined);
  const { user } = useContext(UserContext);
  const [u, setU] = useState(undefined);
  useEffect(() => {
    setU(user);
  }, [user]);
  useEffect(() => {
    axios.get("/category").then(({ data }) => {
      if (!data.error) setCategory(data.category);
    });
  }, []);
  const handleClickNotification = () => {
    if (isNotification) {
      setIsNotification(false);
    } else {
      setIsNotification(true);
    }
  };
  return (
    <header className="header">
      <div className="logo">
        <h2>
          <Link to="/">RADIUS E</Link>
        </h2>
      </div>
      <ul className={`list-category flex ${open ? "open" : ""}`}>
        {category &&
          category.map((c, i) => {
            return (
              <li>
                <Link
                  key={i}
                  onClick={() => setOpen(false)}
                  to={`/product/${c._id}`}
                >
                  {c.name}
                </Link>
              </li>
            );
          })}
        {!u?.cart ? (
          <li className="sign">
            <Link onClick={() => setOpen(false)} to="/signin">
              Signin
            </Link>
          </li>
        ) : (
          <li className="sign">
            <Link onClick={() => setOpen(false)} to="/account-detail">
              {user?.name}
            </Link>
          </li>
        )}
        <li>
          <Link to="/cart">Cart ( {`${u?.cart ? u.cart.length : 0}`})</Link>
        </li>
        <li className="icon-wishlist">
          <Link to="/wishlist">
            <img
              alt="icon-wishlist"
              src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg"
            ></img>
          </Link>
        </li>
        <li className="icon-notification" onClick={handleClickNotification}>
          <img
            alt="iicon-notification"
            src="https://res.cloudinary.com/hoanghai/image/upload/v1610528117/Radius-E/ProductDetail-Delete/icon-etc/bell-solid_roocqb.svg"
          ></img>
          {isNotification ? <Notification /> : ""}
        </li>
      </ul>

      <div className="header-info">
        <div onClick={() => setOpen(!open)} className="toggle">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
