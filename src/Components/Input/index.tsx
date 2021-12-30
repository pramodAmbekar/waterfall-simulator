import React from "react";
import { TextField } from "@mui/material";
import { InputType } from "../../Services/Types/models";

interface InputProps {
  data: InputType;
}
const Input: React.FC<InputProps> = (props) => {
  const { data } = props;
  return (
    <TextField
      error={data.isError}
      id={data.id}
      label={data.label}
      defaultValue={data.value}
      value={data.value}
      helperText={data.errorMessage}
      required={data.required}
      key={data.id+ data.key}
    />
  );
};

export default Input