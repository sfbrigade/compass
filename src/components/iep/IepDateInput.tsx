import React from "react";

interface IepDateInputProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (date: string) => void;
}

const IepDateInput = ({
  name,
  value,
  placeholder,
  onChange,
}: IepDateInputProps) => {
  return (
    <input
      type="date"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        console.log(name, e.target.value);
      }}
      required
    />
  );
};

export default IepDateInput;
