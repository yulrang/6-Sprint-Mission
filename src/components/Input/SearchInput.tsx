import Styles from "./Input.module.scss";
import icoSearch from "../../img/ic_search.svg";
import { ChangeEvent, FormEvent } from "react";

interface SearchInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className: string;
}
export default function SearchInput({
  name,
  value,
  onChange,
  onSubmit,
  className,
}: SearchInputProps) {
  return (
    <div className={className}>
      <form onSubmit={onSubmit} className={`${Styles.search}`}>
        <img src={icoSearch} alt="검색" className={Styles["search__ico"]} />
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className={Styles["search__input"]}
          placeholder="검색할 상품을 입력해주세요"
        />
      </form>
    </div>
  );
}
