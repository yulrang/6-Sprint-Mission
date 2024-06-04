import { ReactNode } from "react";
import Styles from "./Button.module.scss";

interface SmallButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}
export default function SmallButton({
  type,
  children,
  onClick,
  id,
  className,
  disabled,
}: SmallButtonProps) {
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
