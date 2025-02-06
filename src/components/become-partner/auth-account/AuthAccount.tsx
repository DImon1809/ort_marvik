import "./AuthAccount.scss";

import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { handleError } from "../../../errorTypeGuard";
import { toggleAlert } from "../../../store/features/alertSlice";
import { useAuthMutation } from "../../../store/services/endpoints/formApi";
import CustomInput from "../../UI/custom-input/CustomInput";
import FormButton from "../../UI/form-button/FormButton";
import { IBecomeWrapper } from "../become-wrapper/BecomeWrapper";

const AuthAccount: FC<IBecomeWrapper> = ({ slideMove, changeSlideMove }) => {
  const dispatch = useDispatch();

  const [triggerAuth, { isError, error, isSuccess, data, isLoading }] =
    useAuthMutation();

  const [directionName, setDirectionName] = useState<string>("");

  const [isOpenEye, setIsOpenEye] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");

  const [passwordType, setPasswordType] = useState<string>("password");

  const [emailNoValid, setEmailNoValid] = useState<boolean>(false);
  const [pasNoValid, setPasNoValid] = useState<boolean>(false);

  const handleEye = () => {
    if (!isOpenEye) {
      setPasswordType("text");

      return setIsOpenEye(true);
    }

    if (isOpenEye) {
      setPasswordType("password");

      return setIsOpenEye(false);
    }
  };

  const handleToBack = () => {
    setEmail("");
    setPassword("");
    setIsOpenEye(false);
    setPasswordType("password");
    changeSlideMove("agreement");

    changeValidStatus();
  };

  const changeValidStatus = (): void => {
    emailNoValid && setEmailNoValid(false);
    pasNoValid && setPasNoValid(false);
  };

  const handlerAuth = () => {
    if (!email || !password) {
      !email && setEmailNoValid(true);
      !password && setPasNoValid(true);

      return dispatch(
        toggleAlert({ isAlert: true, aletText: "Заполните все поля!" })
      );
    }

    return triggerAuth({ email, password });
  };

  useEffect(() => {
    if (slideMove === "agreement") return setDirectionName("");

    if (slideMove === "auth") return setDirectionName("left");
  }, [slideMove]);

  useEffect(() => {
    if (isError && error) {
      dispatch(
        toggleAlert({
          isAlert: true,
          aletText: "Неправильные логин или пароль!",
        })
      );

      setEmailNoValid(true);
      setPasNoValid(true);
    }

    if (isSuccess) {
      setEmail("");
      setPassword("");

      handleToBack();
      dispatch(toggleAlert({ isAlert: true, aletText: "Вы авторизовались!" }));
    }
  }, [error, , isError, isSuccess]);

  return (
    <div className={`auth-account ${directionName}`}>
      <div className="auth-title">
        <h3>Войти в аккаунт</h3>
      </div>
      <form className="auth-form">
        <CustomInput
          inputType="text"
          inputName="email"
          inputId="auth-email"
          data={email}
          isNoValid={emailNoValid}
          isPassword={false}
          labelText="Введите е-маил"
          setData={setEmail}
          changeValidStatus={changeValidStatus}
        />

        <CustomInput
          inputType={passwordType}
          inputName="password"
          inputId="auth-password"
          data={password}
          isNoValid={pasNoValid}
          isPassword={true}
          labelText="Введите пароль"
          setData={setPassword}
          isOpenEye={isOpenEye}
          handleEye={handleEye}
          changeValidStatus={changeValidStatus}
        />
      </form>
      <div className="auth-buttons">
        <FormButton
          textButton="войти"
          isLoading={isLoading}
          buttonFunction={handlerAuth}
        />
        <FormButton textButton="вернуться" buttonFunction={handleToBack} />
      </div>
    </div>
  );
};

export default AuthAccount;
