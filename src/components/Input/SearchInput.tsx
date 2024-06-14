import { ChangeEvent, FormEvent } from "react";
import Styles from "./Input.module.scss";
import icoSearch from "@/img/ic_search.svg";
import Image from "next/image";

interface SearchInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className: string;
  initialValue: string;
  placeholder: string;
}
export default function SearchInput({
  name,
  value,
  onChange,
  onSubmit,
  className,
  placeholder,
}: SearchInputProps) {
  return (
    <div className={className}>
      <form onSubmit={onSubmit} className={`${Styles.search}`}>
        <Image
          width="24"
          height="24"
          src={icoSearch}
          alt="검색"
          className={Styles["search__ico"]}
        />
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className={Styles["search__input"]}
          placeholder={placeholder}
        />
      </form>
    </div>
  );
}
