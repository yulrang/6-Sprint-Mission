import { useResponsive } from "../../hooks/useResponsive";
import Styles from "./Input.module.scss";
import icoArrow from "../../img/ic_arrow_down.svg";
import icoSort from "../../img/ic_sort.svg";
import { ChangeEvent, MouseEventHandler, useState } from "react";

interface Option {
  value: string;
  name: string;
}

interface SelectProps {
  selectOptions: Option[];
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  className?: string;
}

export default function Select({
  selectOptions,
  name,
  value,
  onChange,
  className,
}: SelectProps) {
  const [isPC, isTablet, isMobile] = useResponsive();
  const [isShow, setIsShow] = useState(false);
  const [mainValue, setMainValue] = useState(value);

  const handleMainClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsShow(!isShow);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMainValue(e.target.value);
    onChange(name, e.currentTarget.value);
    setIsShow(false);
  };

  return (
    <div className={`${Styles.select} ${className}`}>
      <form>
        <div className={Styles["select-main"]}>
          <button
            type="button"
            name={name}
            value={mainValue}
            aria-expanded={isShow}
            aria-controls="select-box"
            onClick={handleMainClick}
            className={Styles["select-main__btn"]}
          >
            {(isPC || isTablet) && (
              <>
                <span aria-hidden="true">
                  {selectOptions.find((el) => el.value === mainValue)?.name}
                </span>
                <img
                  src={icoArrow}
                  alt="아이콘"
                  aria-hidden="true"
                  className="ico-arrow"
                />
              </>
            )}
            {isMobile && (
              <>
                <img src={icoSort} alt="아이콘" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
        {isShow && (
          <ul id="select-box" className={Styles["select-lists"]}>
            {selectOptions.map((option, index) => {
              return (
                <li className={Styles["select-list"]}>
                  <input
                    type="radio"
                    name={name}
                    id={`select-${index + 1}`}
                    value={option.value}
                    onChange={handleChange}
                    className={Styles.radio}
                  />
                  <label
                    htmlFor={`select-${index + 1}`}
                    className={Styles["select-list__btn"]}
                  >
                    {option.name}
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </form>
    </div>
  );
}
