//Navbar.js
import React from "react";
import Logo from "./../logo.png";
const Navbar = () => {
  return (
    <header>
       <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a className="navbar-brand" href="#">srp711</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="section--food--list">Food List <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#section--about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#section--api-doc">API</a>
          </li>
        </ul>
      </div>
    </nav>
    </header>
  );
};
export default Navbar;
