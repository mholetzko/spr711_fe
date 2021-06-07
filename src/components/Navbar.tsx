//Navbar.js
import React from "react";
import Logo from "./../logo.png";
const Navbar = () => {
  return (
    <header>
      <nav className="nav">
        <img src={Logo} alt="SPRLogo" className="nav__logo" />
        <ul className="nav__links">
          <li className="nav__item">
            <a className="nav__link" href="#section--food--list">
              Food List
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link" href="#section--about">
              About
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link nav__link--btn btn--show-modal" href="#">
              Add Store
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link nav__link--btn btn--show-modal" href="#">
              Add Food
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
