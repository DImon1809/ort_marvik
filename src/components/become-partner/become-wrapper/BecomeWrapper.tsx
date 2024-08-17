import { FC, useState } from "react";

import BecomeAgreement from "../become-agreement/BecomeAgreement";
import AuthAccount from "../auth-account/AuthAccount";
import RegisterAccount from "../register-account/RegisterAccount";

import "./BecomeWrapper.scss";

export interface IBecomeWrapper {
  slideMove: string;
  changeSlideMove: (direction: string) => void;
}

const BecomeWrapper: FC = () => {
  const [slideMove, setSlideMove] = useState<string>("agreement");

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
        changeSlideMove={changeSlideMove}
      />
    </div>
  );
};

export default BecomeWrapper;
