/** DESIGN SYSTEM COMPONENT PLACEHOLDER
 * 1) Make a local branch for organizing your component (e.g. "design-systems-button")
 * 2) Replace this file and the corresponding css file(s) with your component file(s), cleaning up any duplicate files that are outside of the design components folder.
 * 3) Search and find all use cases for your component (likely linting will tell you where they are) and update the import paths
 * 4) Check code for errors and delete this comment
 * 5) Push code to branch and do a PR referencing the specific issue task you took for issue # 255.
 * NOTE: If you want a css.d.ts file to be generated or updated to help with any type issues, you can run `npm run type-css`
 * */
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
    <div onClick={onClickAction}>
      <DSCheckbox
        checked={checked}
        className={$checkbox.behavior}
        disabled={disabled || false}
      />
      {text}
    </div>
  );
};

const DSCheckbox = styled(Checkbox)(() => ({
  color: "var(--primary-40)",
  "&.Mui-checked": {
    color: "var(--primary-40)",
  },
}));

export default DS_Checkbox;
