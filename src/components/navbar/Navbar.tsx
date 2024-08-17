import { FC, MouseEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleGlobalWrapper } from "../../store/features/menuSlice";
import { toggleAlertDelete } from "../../store/features/alertSlice";
import { RootType } from "../../store";
import { loguot } from "../../store/features/userSlice";

import { useLazyLogoutQuery } from "../../store/services/endpoints/formApi";

import UserSection from "../user-section/UserSection";

import "./Navbar.scss";

import logo from "../../assets/logo.webp";

const Navbar: FC = () => {
  const dispatch = useDispatch();

  const [triggerLogout] = useLazyLogoutQuery();

  const { isDelete } = useSelector((state: RootType) => state.alertSlice);
  const { isOpenMenu } = useSelector((state: RootType) => state.menuSlice);
  const { jwtToken, isAuth } = useSelector(
    (state: RootType) => state.userSlice
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const toggleBurger = (
    event: MouseEvent<HTMLAnchorElement | HTMLDivElement>
  ) => {
    if (
      event.currentTarget.className === "nav-item-a" ||
      event.currentTarget.className === "logo-wrapper"
    )
      return dispatch(toggleGlobalWrapper(false));

    if (isOpenMenu) return dispatch(toggleGlobalWrapper(false));

    if (!isOpenMenu) return dispatch(toggleGlobalWrapper(true));
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");

    triggerLogout();
    dispatch(loguot());
    dispatch(toggleGlobalWrapper(false));
    setIsAuthenticated(false);
  };

  const handleDeleteAccount = () => {
    if (isOpenMenu && isDelete) {
      dispatch(toggleAlertDelete(false));
      return dispatch(toggleGlobalWrapper(false));
    }

    dispatch(toggleGlobalWrapper(true));
    dispatch(toggleAlertDelete(true));
  };

  useEffect(() => {
    if (isAuth && (jwtToken || localStorage.getItem("token"))) {
      return setIsAuthenticated(true);
    }

    return setIsAuthenticated(false);
  }, [isAuth]);

  return (
    <nav className="navbar">
      <div className="navbar-content-wrapper">
        <div className="logo-wrapper" onClick={toggleBurger}>
          <a href="#begin">
            <img src={logo} alt="#" />
          </a>
        </div>

        <UserSection />
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

            {isAuthenticated ? (
              <>
                <li className="nav-item-user" onClick={handleDeleteAccount}>
                  удалить аккаунт
                </li>
                <li className="nav-item-user" onClick={handleLogout}>
                  выйти
                </li>
              </>
            ) : (
              ""
            )}
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
