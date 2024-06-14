import { ReactNode } from "react";
import Styles from "./Button.module.scss";
import { ButtonProps } from "./type";

export default function LargeButton({
  type = "button",
  children,
  onClick,
  id,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      id={id}
      className={`${Styles["btn-large"]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
