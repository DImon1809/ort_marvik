import { FC, useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { RootType } from "../../store";

import { useLazyCurrentQuery } from "../../store/services/endpoints/formApi";

import "./UserSection.scss";

const UserSection: FC = () => {
  const { jwtToken, userName, isAuth } = useSelector(
    (state: RootType) => state.userSlice
  );

  const [triggerCurrent, { isError, isLoading, isSuccess, data }] =
    useLazyCurrentQuery();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuth && (jwtToken || localStorage.getItem("token"))) {
      triggerCurrent();

      return setIsAuthenticated(true);
    }

    if (isAuth && (jwtToken || localStorage.getItem("token"))) {
      triggerCurrent();

      return setIsAuthenticated(true);
    }

    return setIsAuthenticated(false);
  }, [isAuth]);

  return (
    <div className="user-section">
      {isLoading ? (
        <div className="user-loading"></div>
      ) : (
        <>
          <div
            className={isAuthenticated ? "user-image visible" : "user-image"}
          ></div>
          <div
            className={
              userName.length > 10
                ? "user-name-wrapper long"
                : "user-name-wrapper"
            }
          >
            <p>{userName}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSection;
