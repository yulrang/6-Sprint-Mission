import { ReactNode } from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}
