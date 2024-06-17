import { ReactNode } from "react";
import Styles from "./Button.module.scss";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  id: string;
  className: string;
  disabled: boolean;
  children: ReactNode;
  size: string;
}

export default function Button({ children, onClick, id, className, disabled, type = "button", size = "small" }: ButtonProps) {
  const buttonClass = size === "small" ? `${Styles["btn-small"]} ${className}` : `${Styles["btn-large"]} ${className}`;
  return (
    <button type={type} onClick={onClick} id={id} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
}
