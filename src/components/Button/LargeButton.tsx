import { ReactNode } from "react";
import Styles from "./Button.module.scss";

interface LargeButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

export default function LargeButton({
  type = "button",
  children,
  onClick,
  id,
  className,
  disabled,
}: LargeButtonProps) {
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
