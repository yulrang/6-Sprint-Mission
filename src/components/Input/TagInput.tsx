import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Styles from "./Input.module.scss";
import icoX from "../../img/ic_x.svg";

interface TagInputProps {
  name: string;
  onChange: (name: string, value: string[]) => void;
}

export default function TagInput({ name, onChange }: TagInputProps) {
  const [tagArr, setTagArr] = useState<string[]>([]);
  const tagInput = useRef<HTMLInputElement>(null);

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      const nextValue = e.currentTarget.value;

      setTagArr((prevArr) => [...prevArr, nextValue]);
      if (tagInput.current) tagInput.current.value = "";
    }
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    const nextTagArr: string[] = tagArr.filter(
      (el, index) => index !== Number(e.currentTarget.value)
    );

    setTagArr(nextTagArr);
    onChange(name, nextTagArr);
  };

  useEffect(() => {
    onChange(name, tagArr);
  }, [tagArr, name]);

  return (
    <div className={Styles["tag-view"]}>
      <input
        type="text"
        onKeyDown={handleKeydown}
        ref={tagInput}
        className={Styles.input}
        placeholder="태그를 입력해주세요"
      />
      <ul className={Styles["tag-container"]}>
        {tagArr.map((tag, index) => {
          return (
            <li key={index} className={Styles["tag-view__list"]}>
              <span className={Styles["tag-view__txt"]}>{tag}</span>
              <button
                type="button"
                value={index}
                onClick={handleDelete}
                className={Styles["tag-view__btn"]}
              >
                <img src={icoX} alt="아이콘" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
