import Image from "next/image";
import icoArrow from "@/src/img/ic_arrow_down.svg";
import icoSort from "@/src/img/ic_sort.svg";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import useResponsive from "@/src/hooks/useResponsive";
import Styles from "./Input.module.scss";

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

export default function Select({ selectOptions, name, value, onChange, className }: SelectProps) {
  const [isPC, isTablet, isMobile] = useResponsive();
  const [device, setDevice] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [mainValue, setMainValue] = useState(value);

  const handleMainClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsShow(!isShow);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMainValue(e.target.value);
    onChange(name, e.currentTarget.value);
    setIsShow(false);
  };

  useEffect(() => {
    setDevice(isMobile ? "mobile" : isTablet ? "tablet" : "desktop");
  }, [isPC, isTablet, isMobile]);

  return (
    <div className={`${Styles.select} ${className}`}>
      <form>
        <div className={Styles["select-main"]}>
          <button type="button" name={name} value={mainValue} aria-expanded={isShow} aria-controls="select-box" onClick={handleMainClick} className={Styles["select-main__btn"]}>
            {(device === "desktop" || device === "tablet") && (
              <>
                <span aria-hidden="true">{selectOptions.find((el) => el.value === mainValue)?.name}</span>
                <Image width="24" height="24" src={icoArrow} alt="아이콘" aria-hidden="true" className="ico-arrow" />
              </>
            )}
            {device === "mobile" && (
              <>
                <Image width="24" height="24" src={icoSort} alt="아이콘" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
        {isShow && (
          <ul id="select-box" className={Styles["select-lists"]}>
            {selectOptions.map((option, index) => (
              <li className={Styles["select-list"]}>
                <input type="radio" name={name} id={`select-${index + 1}`} value={option.value} onChange={handleChange} className={Styles.radio} />
                <label htmlFor={`select-${index + 1}`} className={Styles["select-list__btn"]}>
                  {option.name}
                </label>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
