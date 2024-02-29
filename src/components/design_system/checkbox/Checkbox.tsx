import { Checkbox } from "@mui/material";
import { styled } from "@mui/material";
import $checkbox from "./Checkbox.module.css";
import { MouseEventHandler } from "react";

interface CheckboxProps {
  onClickAction: MouseEventHandler<HTMLDivElement>;
  text?: string;
  checked: boolean;
  disabled?: boolean;
}

const DS_Checkbox = ({
  onClickAction,
  text,
  checked,
  disabled,
}: CheckboxProps) => {
  return (
    <div onClick={onClickAction} className={$checkbox.checkboxWrapper}>
      <MUICheckbox
        edge="start"
        checked={checked}
        className={$checkbox.behavior}
        disabled={disabled || false}
      />
      {text}
    </div>
  );
};

const MUICheckbox = styled(Checkbox)(() => ({
  color: "var(--primary-40)",
  "&.Mui-checked": {
    color: "var(--primary-40)",
  },
}));

export default DS_Checkbox;
