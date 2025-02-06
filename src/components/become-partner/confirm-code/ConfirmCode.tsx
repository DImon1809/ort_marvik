import "./ConfirmCode.scss";

import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleAlert } from "../../../store/features/alertSlice";
import { useRepeatCodeMutation } from "../../../store/services/endpoints/formApi";
import { useConfirmCodeMutation } from "../../../store/services/endpoints/formApi";
import FormButton from "../../UI/form-button/FormButton";

export interface IConfirmCode {
  slideMove: string;
  currentEmail: string;
  currentName: string;
  currentPas: string;
  changeSlideMove: (direction: string) => void;
}

const ConfirmCode: FC<IConfirmCode> = ({
  slideMove,
  currentEmail,
  currentName,
  currentPas,
  changeSlideMove,
}) => {
  const dispatch = useDispatch();

  const [
    triggerRepeat,
    {
      isError: repeateError,
      isSuccess: repeateSuccess,
      isLoading: repeatLoading,
    },
  ] = useRepeatCodeMutation();

  const [
    triggerConfirmCode,
    {
      isError: confirmError,
      isSuccess: confirmSuccess,
      isLoading: confirmLoading,
    },
  ] = useConfirmCodeMutation();

  const [directionName, setDirectionName] = useState<string>("");

  const [code, setCode] = useState<string>("");
  const [isNoValidCode, setIsNoValidCode] = useState<boolean>(false);

  const [isTimer, setIsTimer] = useState<boolean>(false);

  const handleConfirmCode = () => {
    triggerConfirmCode({
      userName: currentName,
      email: currentEmail,
      password: currentPas,
      code: code.split(" ").join(""),
    });
  };

  const sendAgain = () => {
    triggerRepeat({
      userName: currentName,
      email: currentEmail,
      code: code.split(" ").join(""),
    });
  };

  const handleToBack = () => {
    setCode("");
    setIsTimer(false);
    setIsNoValidCode(false);
    changeSlideMove("agreement");
  };

  useEffect(() => {
    if (slideMove === "agreement") return setDirectionName("");

    if (slideMove === "confirm") {
      return setDirectionName("double-left");
    }

    if (slideMove === "register") return setDirectionName("left");
  }, [slideMove]);

  useEffect(() => {
    if (confirmError && !confirmSuccess) {
      dispatch(toggleAlert({ isAlert: true, aletText: "Неправильный код!" }));

      return setIsNoValidCode(true);
    }

    if (!confirmError && confirmSuccess) {
      dispatch(
        toggleAlert({ isAlert: true, aletText: "Вы зарегистрировались!" })
      );

      handleToBack();
    }
  }, [confirmError, confirmSuccess]);

  useEffect(() => {
    if (repeateError && !repeateSuccess) {
      dispatch(
        toggleAlert({ isAlert: true, aletText: "Что-то пошло не так!" })
      );
    }

    if (!repeateError && repeateSuccess) {
      dispatch(
        toggleAlert({ isAlert: true, aletText: "Новый код отправлен!" })
      );

      setIsTimer(true);
    }
  }, [repeateError, repeateSuccess]);

  return (
    <div className={`confirm-code ${directionName}`}>
      <div className="confirm-code-title">
        <h3>Подтверждение регистрации</h3>
      </div>
      <div className="confirm-form">
        <div className="input-wrapper">
          <input
            className={isNoValidCode ? "input-code no-valid" : "input-code"}
            type="text"
            name="input-code"
            id="input-code"
            placeholder="Введите код..."
            autoComplete="off"
            value={code}
            onChange={(event) => {
              setIsNoValidCode(false);

              setCode(event.target.value);
            }}
          />
        </div>
        <div className="buttons-wrapper">
          <FormButton
            textButton="Отправить заново"
            buttonFunction={sendAgain}
            isTimer={isTimer}
            setIsTimer={setIsTimer}
            isLoading={repeatLoading}
          />
          <FormButton
            textButton="Подтвердить"
            buttonFunction={handleConfirmCode}
            isLoading={confirmLoading}
          />
          <FormButton textButton="Отмена" buttonFunction={handleToBack} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmCode;
