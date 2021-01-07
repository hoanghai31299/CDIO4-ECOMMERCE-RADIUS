import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import axios from "../../axios";

function Header({ user }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(undefined);
  const [listInforCart, setListInforCart] = useState([]);
  useEffect(() => {
    axios.get("/category").then(({ data }) => {
      if (!data.error) setCategory(data.category);
    });
    axios
      .get("/auth/signinW")
      .then((res) => {
        setListInforCart(res.data.user.cart);
      })
      .catch((err) => {});
  }, []);
  return (
    <header className="header">
      <div className="logo">
        <h2>
          <Link to="/">RADIUS E</Link>
        </h2>
      </div>
      <ul className={`list-category ${open && "open"}`}>
        {category &&
          category.map((c) => {
            return (
              <li>
                <Link to={`/product/${c._id}`}>{c.name}</Link>
              </li>
            );
          })}
        {!user ? (
          <li className="sign">
            <Link to="/signin">Signin</Link>
          </li>
        ) : (
          <li className="sign">
            <Link to="/account-detail">{user.name}</Link>
          </li>
        )}
        {/* <li>
          <Link to="/signup">Signup</Link>
        </li> */}
        <li>
          <Link to="/cart">
            Cart ( {listInforCart ? listInforCart.length : "0"})
          </Link>
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
