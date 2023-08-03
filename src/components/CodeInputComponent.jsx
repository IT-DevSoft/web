import React from "react";
import InputMask from "react-input-mask";

export const CodeInputComponent = ({ onChange = () => {}, disabled }) => {
  return (
    <InputMask
      disabled={disabled}
      placeholder="Код подтверждения"
      mask="9999"
      onChange={(e) => onChange(e.target.value.replace(/[^0-9]+/g, ""))}
    />
  );
};
