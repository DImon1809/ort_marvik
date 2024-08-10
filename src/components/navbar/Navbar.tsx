import { FC, MouseEvent } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleGlobalWrapper } from "../../store/features/menuSlice";
import { RootType } from "../../store";

import "./Navbar.scss";

import logo from "../../assets/logo.webp";

const Navbar: FC = () => {
  const dispatch = useDispatch();

  const { isOpenMenu } = useSelector((state: RootType) => state.menuSlice);

  const toggleBurger = (
    event: MouseEvent<HTMLAnchorElement | HTMLDivElement>
  ) => {
    if (event.currentTarget.className === "nav-item-a")
      return dispatch(toggleGlobalWrapper(false));

    if (isOpenMenu) return dispatch(toggleGlobalWrapper(false));

    if (!isOpenMenu) return dispatch(toggleGlobalWrapper(true));
  };

  return (
    <nav className="navbar">
      <div className="navbar-content-wrapper">
        <div className="logo-wrapper">
          <a href="#begin">
            <img src={logo} alt="#" />
          </a>
        </div>
        <div
          className={
            isOpenMenu ? "nav-item-wrapper active" : "nav-item-wrapper"
          }
        >
          <ul>
            <li className="nav-item">
              <a
                href="#about-printer"
                className="nav-item-a"
                onClick={toggleBurger}
              >
                о принтере
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#about-orthosis"
                className="nav-item-a"
                onClick={toggleBurger}
              >
                об ортезе
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#become-partner"
                className="nav-item-a"
                onClick={toggleBurger}
              >
                стать партнером
              </a>
            </li>
          </ul>
        </div>

        <div
          className={isOpenMenu ? "burger active" : "burger"}
          onClick={toggleBurger}
        >
          <span className="center-line"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
