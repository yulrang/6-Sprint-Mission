import { ChangeEvent, useState } from "react";
import Styles from "./Input.module.scss";

interface EmailInputProps {
  name?: string;
  value?: string;
  onChange?: () => void;
  id?: string;
  className?: string;
  required?: boolean;
  setIsInvalid: (value: boolean) => void;
}

export default function EmailInput({
  name,
  value,
  onChange,
  id,
  className,
  required,
  setIsInvalid,
}: EmailInputProps) {
  const [isEmpty, setIsEmpty] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
    if (e.target.value.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };
  return (
    <>
      <input
        type="email"
        name={name}
        value={value}
        onChange={handleChange}
        id={id}
        className={`${Styles.input}`}
        placeholder="이메일을 입력해주세요"
        required={required}
      />
      {isEmpty && <p className="alert">이메일을 입력하세요.</p>}
    </>
  );
}
