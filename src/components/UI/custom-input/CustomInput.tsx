import { FC } from "react";

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

import "./CustomInput.scss";

export interface ICustomInput {
  inputType: string;
  inputName: string;
  inputId: string;
  data: string;
  isNoValid: boolean;
  labelText: string;
  isPassword: boolean;
  isOpenEye?: boolean;
  setData: (value: string) => void;
  handleEye?: () => void;
  changeValidStatus: () => void;
}

const CustomInput: FC<ICustomInput> = ({
  inputType,
  inputName,
  inputId,
  data,
  labelText,
  changeValidStatus,
  isNoValid,
  isPassword,
  isOpenEye,
  setData,
  handleEye,
}) => {
  return (
    <div className="custom-input-wrapper">
      <input
        className={isNoValid ? "custom-input no-valid" : "custom-input"}
        type={inputType}
        name={inputName}
        id={inputId}
        placeholder=" "
        autoComplete="off"
        value={data}
        onChange={(event) => {
          changeValidStatus();
          setData(event.target.value);
        }}
      />
      <label htmlFor={inputId}>{labelText}</label>

      {isPassword ? (
        <div className="eye-wrapper" onClick={handleEye}>
          {!isOpenEye ? <FiEye /> : <FiEyeOff />}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomInput;
