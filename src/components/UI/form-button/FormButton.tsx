import {
  FC,
  Dispatch,
  SetStateAction,
  MouseEvent,
  useEffect,
  useState,
} from "react";

import "./FormButton.scss";

export interface IFormButton {
  textButton: string;
  isLoading?: boolean;
  isTimer?: boolean;
  buttonFunction?: () => void;
  setIsTimer?: Dispatch<SetStateAction<boolean>>;
}

const FormButton: FC<IFormButton> = ({
  textButton,
  isTimer,
  isLoading,
  buttonFunction,
  setIsTimer,
}) => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);

  const handleButton = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();

    if (!isBlocked && buttonFunction) {
      buttonFunction();
      if (isTimer && setIsTimer) {
        setIsTimer(true);
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimer && isBlocked) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            setIsBlocked(false);
            setIsTimer && setIsTimer(false);

            clearInterval(interval);

            return 60;
          }
        });
      }, 1000);
    } else {
      setTime(60);
      setIsBlocked(false);
    }

    return () => clearInterval(interval);
  }, [isTimer, isBlocked, setIsTimer]);

  useEffect(() => {
    if (isTimer) {
      setIsBlocked(true);
    }
  }, [isTimer]);

  return (
    <div
      className={isBlocked ? "form-button blocked" : "form-button"}
      onClick={handleButton}
    >
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <p>{isBlocked ? time : textButton}</p>
      )}
    </div>
  );
};

export default FormButton;
