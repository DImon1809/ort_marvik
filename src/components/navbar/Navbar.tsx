import { FC } from "react";

import "./Navbar.scss";

import logo from "../../assets/logo.png";

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content-wrapper">
        <div className="logo-wrapper">
          <img src={logo} alt="#" />
        </div>
        <div className="nav-item-wrapper">
          <ul>
            <li className="nav-item">о принтере</li>
            <li className="nav-item">об ортезе</li>
            <li className="nav-item">стать партнером</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
