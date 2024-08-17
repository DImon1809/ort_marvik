import { FC, useEffect, useState } from "react";

import { useLazyAddBidQuery } from "../../../store/services/endpoints/ligikApi";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../../store";
import { toggleAlert } from "../../../store/features/alertSlice";

import "./BecomeAgreement.scss";

export interface IBecomeAgreement {
  slideMove: string;
  changeSlideMove: (direction: string) => void;
}

const BecomeAgreement: FC<IBecomeAgreement> = ({
  slideMove,
  changeSlideMove,
}) => {
  const dispatch = useDispatch();

  const { isAuth, isBid } = useSelector((state: RootType) => state.userSlice);

  const [addBidTrigger, { isError, isSuccess }] = useLazyAddBidQuery();

  const [directionName, setDirectionName] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [isNecessarily, setIsNecessarily] = useState<boolean>(false);

  const [isSendedBid, setIsSendedBid] = useState<boolean>(false);

  const handleSendBid = (): void => {
    if (!isAuth) {
      setIsNecessarily(true);
    }

    if (isAuth) {
      addBidTrigger();
    }
  };

  useEffect(() => {
    if (slideMove === "agreement") return setDirectionName("");

    if (slideMove === "auth") return setDirectionName("left");

    if (slideMove === "register") return setDirectionName("right");
  }, [slideMove]);

  useEffect(() => {
    if (isAuth) return setIsAuthenticated(true);

    return setIsAuthenticated(false);
  }, [isAuth]);

  useEffect(() => {
    if (isSuccess)
      dispatch(toggleAlert({ isAlert: true, aletText: "Заявка отправлена!" }));

    if (isBid && !isSendedBid) {
      return setIsSendedBid(true);
    }

    return setIsSendedBid(false);
  }, [isBid]);

  return (
    <div className={`become-agreement ${directionName}`}>
      <div className="become-content">
        <div className="agreement-title">
          <h3>Стать партнером</h3>
        </div>
        <div className="agreement-paragraph">
          <p>
            Если вы желаете присоединиться к нашей команде, дайте нам,
            пожалуйста, об это знать. Оставьте заявку на сайте и наши модераторы
            очень скоро выйдут с вами на связь.
          </p>
        </div>

        {isAuthenticated ? (
          ""
        ) : (
          <div className="agreement-description">
            <p>
              Чтобы оставить заявку на сайте, пожалуйста,{" "}
              <span
                className={
                  isNecessarily ? "to-register necessarily" : "to-register"
                }
                onClick={() => {
                  isNecessarily && setIsNecessarily(false);

                  changeSlideMove("register");
                }}
              >
                зарегистрируйтесь
              </span>{" "}
              или{" "}
              <span
                className={isNecessarily ? "to-auth necessarily" : "to-auth"}
                onClick={() => {
                  isNecessarily && setIsNecessarily(false);

                  changeSlideMove("auth");
                }}
              >
                войдите в аккаунт
              </span>
            </p>
          </div>
        )}
      </div>

      {isSendedBid ? (
        <div className="bid-button">
          <p>отправлено</p>
        </div>
      ) : (
        <div className="send-bid-button" onClick={handleSendBid}>
          <p>оставить заявку</p>
        </div>
      )}
    </div>
  );
};

export default BecomeAgreement;
