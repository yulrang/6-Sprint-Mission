import { ReactNode } from "react";
import Styles from "./Button.module.scss";
import { ButtonProps } from "../../src/types/button";

export default function SmallButton({
  type,
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
      className={`${Styles["btn-small"]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
