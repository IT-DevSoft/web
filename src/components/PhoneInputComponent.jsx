import React from "react";
import InputMask from "react-input-mask";

export const PhoneInputComponent = ({ onChange = () => {}, disabled }) => {
  return (
    <InputMask
      disabled={disabled}
      placeholder="+7(999)999-99-99"
      mask="+7(999)999-99-99"
      onChange={(e) =>
        onChange(e.target.value.replace(/[^0-9]+/g, "").substring(1))
      }
    />
  );
};
