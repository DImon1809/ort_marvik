import "./BecomeWrapper.scss";

import { FC, useState } from "react";

import AuthAccount from "../auth-account/AuthAccount";
import BecomeAgreement from "../become-agreement/BecomeAgreement";
import ConfirmCode from "../confirm-code/ConfirmCode";
import RegisterAccount from "../register-account/RegisterAccount";

export interface IBecomeWrapper {
  slideMove: string;
  changeSlideMove: (direction: string) => void;
}

const BecomeWrapper: FC = () => {
  const [slideMove, setSlideMove] = useState<string>("agreement");

  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [currentName, setCurrentName] = useState<string>("");
  const [currentPas, setCurrentPas] = useState<string>("");

  const changeSlideMove = (direction: string): void => {
    setSlideMove(direction);
  };

  return (
    <div className="become-wrapper">
      <AuthAccount slideMove={slideMove} changeSlideMove={changeSlideMove} />
      <BecomeAgreement
        slideMove={slideMove}
        changeSlideMove={changeSlideMove}
      />
      <RegisterAccount
        slideMove={slideMove}
        setCurrentEmail={setCurrentEmail}
        setCurrentName={setCurrentName}
        setCurrentPas={setCurrentPas}
        changeSlideMove={changeSlideMove}
      />
      <ConfirmCode
        slideMove={slideMove}
        currentEmail={currentEmail}
        currentName={currentName}
        currentPas={currentPas}
        changeSlideMove={changeSlideMove}
      />
    </div>
  );
};

export default BecomeWrapper;
