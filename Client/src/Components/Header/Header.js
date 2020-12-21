import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const category = [
  {
    name: "Sunglasses",
  },
  {
    name: "Glasses",
  },
  {
    name: "Accessories",
  },
  {
    name: "Sunglasses",
  },
  {
    name: "Sunglasses",
  },
  {
    name: "Sunglasses",
  },
];
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="logo">
        <h2>RADIUS E</h2>
      </div>
      <ul className={`list-category ${open && "open"}`}>
        {category.map((c) => {
          return (
            <li>
              <Link to="/product">{c.name}</Link>
            </li>
          );
        })}
        <li className="sign">
          <Link to="/signin">Signin</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
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
