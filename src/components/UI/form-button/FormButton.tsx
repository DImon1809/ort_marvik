import { FC, MouseEvent } from "react";

import "./FormButton.scss";

export interface IFormButton {
  textButton: string;
  isLoading?: boolean;
  buttonFunction?: () => void;
}

const FormButton: FC<IFormButton> = ({
  textButton,
  isLoading,
  buttonFunction,
}) => {
  const handleButton = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();

    buttonFunction && buttonFunction();
  };

  return (
    <div className="form-button" onClick={handleButton}>
      {isLoading ? <div className="loading"></div> : <p>{textButton}</p>}
    </div>
  );
};

export default FormButton;
