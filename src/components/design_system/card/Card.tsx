import { Button } from "@mui/material";

interface CardProps {
  onClick: () => void;
  header: string;
  body: string;
  buttonText: string;
  eyebrow: string;
}

const Card = ({ onClick, header, body, buttonText, eyebrow }: CardProps) => {
  /*************
   * state, ref
   *************/

  /************
   * functions
   ************/

  /*********
   * render
   *********/

  /***********
   * render()
   ***********/

  return (
    <div onClick={onClick}>
      {header}
      {body}
      {eyebrow}
      <Button>{buttonText}</Button>
    </div>
  );
};

export default Card;
