import "./AlertWindow.scss";

import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootType } from "../../store";
import { toggleAlert } from "../../store/features/alertSlice";

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

        dispatch(toggleAlert({ isAlert: false, aletText: "Внимание!" }));
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
