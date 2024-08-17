import { FC, useEffect, useState } from "react";

import { RootType } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../store/features/alertSlice";

import "./AlertWindow.scss";

const AlertWindow: FC = () => {
  const dispatch = useDispatch();

  const { isAlert, alertText } = useSelector(
    (state: RootType) => state.alertSlice
  );

  const [isvisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isAlert) {
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);

        dispatch(toggleAlert({ isAlert: false }));
      }, 2000);
    }
  }, [isAlert]);

  return (
    <div className={isvisible ? "alert-window active" : "alert-window"}>
      <p>{alertText}</p>
    </div>
  );
};

export default AlertWindow;
