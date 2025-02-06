import "./DeleteAccount.scss";

import { FC, useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import { RootType } from "../../store";
import {
  toggleAlert,
  toggleAlertDelete,
} from "../../store/features/alertSlice";
import { toggleGlobalWrapper } from "../../store/features/menuSlice";
import { loguot } from "../../store/features/userSlice";
import { useLazyDeleteUserQuery } from "../../store/services/endpoints/formApi";

const DeleteAccount: FC = () => {
  const dispatch = useDispatch();

  const [triggerDelete, { isError, isSuccess }] = useLazyDeleteUserQuery();

  const { isDelete } = useSelector((state: RootType) => state.alertSlice);

  const [isAlert, setIsAlert] = useState<boolean>(false);

  const handleClose = () => {
    dispatch(toggleAlertDelete(false));
    dispatch(toggleGlobalWrapper(false));
  };

  const handleConfirm = () => {
    triggerDelete();

    handleClose();
  };

  useEffect(() => {
    if (isDelete) return setIsAlert(true);

    return setIsAlert(false);
  }, [isDelete]);

  useEffect(() => {
    if (isSuccess && !isError) {
      dispatch(toggleAlert({ isAlert: true, aletText: "Аккаунт удален!" }));

      localStorage.removeItem("token");

      dispatch(loguot());
    }

    if (isError && !isSuccess)
      dispatch(
        toggleAlert({ isAlert: true, aletText: "Что-то пошло не так!" })
      );
  }, [isError, isSuccess]);

  return (
    <div className={isAlert ? "delete-account visible" : "delete-account"}>
      <div className="cross-wrapper" onClick={handleClose}>
        <span className="left-cross-part"></span>
        <span className="right-cross-part"></span>
      </div>
      <div className="delete-account-text">
        <p>Вы правда хотите удалить аккаунт?</p>
      </div>
      <div className="delete-button" onClick={handleConfirm}>
        <p>подтвердить</p>
      </div>
    </div>
  );
};

export default DeleteAccount;
