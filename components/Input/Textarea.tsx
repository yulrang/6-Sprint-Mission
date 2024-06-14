import { LegacyRef } from "react";
import Styles from "./Input.module.scss";

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  size: string;
  ref: LegacyRef<HTMLTextAreaElement>;
}

export default function TextArea({
  name,
  value,
  onChange,
  id,
  className,
  required,
  placeholder,
  ref,
  size = "small",
}: TextAreaProps) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      id={id}
      className={`${Styles.input} ${className} ${
        size === "large" ? Styles.large : ""
      }`}
      placeholder={placeholder}
      required={required}
      ref={ref}
    />
  );
}
