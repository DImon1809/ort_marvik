import "./RegisterAccount.scss";

import { Dispatch, FC, SetStateAction, useEffect,useState } from "react";
import { useDispatch } from "react-redux";

import { handleError } from "../../../errorTypeGuard";
import { toggleAlert } from "../../../store/features/alertSlice";
import { useRegisterMutation } from "../../../store/services/endpoints/formApi";
import CustomInput from "../../UI/custom-input/CustomInput";
import FormButton from "../../UI/form-button/FormButton";
import { IBecomeWrapper } from "../become-wrapper/BecomeWrapper";

export interface IRegisterAccount extends IBecomeWrapper {
  setCurrentName: Dispatch<SetStateAction<string>>;
  setCurrentEmail: Dispatch<SetStateAction<string>>;
  setCurrentPas: Dispatch<SetStateAction<string>>;
}

const RegisterAccount: FC<IRegisterAccount> = ({
  slideMove,
  setCurrentEmail,
  setCurrentName,
  setCurrentPas,
  changeSlideMove,
}) => {
  const dispatch = useDispatch();

  const [
    triggerRegister,
    { isError, isLoading, isSuccess, data, error, status },
  ] = useRegisterMutation();

  const [directionName, setDirectionName] = useState<string>("");

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [passwordType, setPasswordType] = useState<string>("password");
  const [isOpenPassword, setIOpenPassword] = useState<boolean>(false);

  const [repPasswordType, setRepPasswordType] = useState<string>("password");
  const [isOpenRepPassword, setIOpenRepPassword] = useState<boolean>(false);

  const [unNoValid, setUNNoValid] = useState<boolean>(false);
  const [emailNoValid, setEmailNoValid] = useState<boolean>(false);
  const [pasNoValid, setPasNoValid] = useState<boolean>(false);
  const [rePasNoValid, setRePasNoValid] = useState<boolean>(false);

  const handleOpenPas = () => {
    if (!isOpenPassword) {
      setPasswordType("text");

      return setIOpenPassword(true);
    }

    if (isOpenPassword) {
      setPasswordType("password");

      return setIOpenPassword(false);
    }
  };

  const handleOpenRepPas = () => {
    if (!isOpenRepPassword) {
      setRepPasswordType("text");

      return setIOpenRepPassword(true);
    }

    if (isOpenRepPassword) {
      setRepPasswordType("password");

      return setIOpenRepPassword(false);
    }
  };

  const handleToBack = () => {
    setUserName("");
    setEmail("");

    setPassword("");
    setIOpenPassword(false);
    setPasswordType("password");

    setRepeatPassword("");
    setIOpenRepPassword(false);
    setRepPasswordType("password");

    changeSlideMove("agreement");

    changeValidStatus();
  };

  const changeValidStatus = (): void => {
    unNoValid && setUNNoValid(false);
    emailNoValid && setEmailNoValid(false);
    pasNoValid && setPasNoValid(false);
    rePasNoValid && setRePasNoValid(false);
  };

  const handleRegister = () => {
    if (!userName || !email || !password || !repeatPassword) {
      !userName && setUNNoValid(true);
      !email && setEmailNoValid(true);
      !password && setPasNoValid(true);
      !repeatPassword && setRePasNoValid(true);

      return dispatch(
        toggleAlert({ isAlert: true, aletText: "Заполните все поля!" })
      );
    }

    return triggerRegister({ userName, email, password, repeatPassword });
  };

  useEffect(() => {
    if (slideMove === "agreement") return setDirectionName("");

    if (slideMove === "register") return setDirectionName("right");

    if (slideMove === "confirm") return setDirectionName("left");
  }, [slideMove]);

  useEffect(() => {
    if (isError && error) {
      let message =
        handleError(error)?.message[0] ===
        "password must be longer than or equal to 6 characters"
          ? "Пароль должен быть больше 6 символов!"
          : "Что-то пошло не так!";

      message =
        handleError(error)?.message[0] === "Пароли не совпадают!"
          ? "Пароли не совпадают!"
          : message;

      dispatch(toggleAlert({ isAlert: true, aletText: message }));
    }

    if (isSuccess) {
      setCurrentName(userName);
      setCurrentEmail(email);
      setCurrentPas(password);
      setUserName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");

      dispatch(toggleAlert({ isAlert: true, aletText: "Проверьте почту!" }));

      changeSlideMove("confirm");
    }
  }, [data, isError, error, isSuccess, status]);

  return (
    <div className={`register-account ${directionName}`}>
      <div className="register-account-title">
        <h3>Регистрация</h3>
      </div>

      <form className="register-form">
        <CustomInput
          inputType="text"
          inputName="userName"
          inputId="register-user-name"
          isNoValid={unNoValid}
          data={userName}
          isPassword={false}
          labelText="Придумайте никнейм"
          setData={setUserName}
          changeValidStatus={changeValidStatus}
        />

        <CustomInput
          inputType="text"
          inputName="email"
          inputId="register-email"
          isNoValid={emailNoValid}
          data={email}
          isPassword={false}
          labelText="Введите е-маил"
          setData={setEmail}
          changeValidStatus={changeValidStatus}
        />

        <CustomInput
          inputType={passwordType}
          inputName="password"
          inputId="register-password"
          data={password}
          isNoValid={pasNoValid}
          isPassword={true}
          labelText="Придумайте пароль"
          setData={setPassword}
          isOpenEye={isOpenPassword}
          handleEye={handleOpenPas}
          changeValidStatus={changeValidStatus}
        />

        <CustomInput
          inputType={repPasswordType}
          inputName="rep-password"
          inputId="register-rep-password"
          data={repeatPassword}
          isNoValid={rePasNoValid}
          isPassword={true}
          labelText="Повторите пароль"
          setData={setRepeatPassword}
          isOpenEye={isOpenRepPassword}
          handleEye={handleOpenRepPas}
          changeValidStatus={changeValidStatus}
        />
      </form>

      <div className="register-buttons">
        <FormButton
          textButton="зарегистироваться"
          buttonFunction={handleRegister}
          isLoading={isLoading}
        />
        <FormButton textButton="вернуться" buttonFunction={handleToBack} />
      </div>
    </div>
  );
};

export default RegisterAccount;
