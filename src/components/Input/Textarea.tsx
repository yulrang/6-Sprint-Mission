import Styles from "./Input.module.scss";

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
}

export default function TextArea({
  name,
  value,
  onChange,
  id,
  className,
  required,
  placeholder,
}: TextAreaProps) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      id={id}
      className={`${Styles.input} ${className}`}
      placeholder={placeholder}
      required={required}
    />
  );
}
