import Image from "next/image";
import userImg from "@/src/img/ic_profile.svg";
import Styles from "./ReplyList.module.scss";
import { Comment } from "@/src/types/product";

const getTime = (updatedTime: Date): string => {
  const UPDATED_TIME = new Date(updatedTime);
  const NOW = new Date();

  let time = Math.ceil((NOW.getTime() - UPDATED_TIME.getTime()) / 1000 / 60 / 60 / 24);
  let result: string;

  if (time >= 24) {
    time = Math.ceil(time / 24);
    result = time + "일 전";
  } else {
    result = time + "시간 전";
  }
  return result;
};

export default function ReplyList({ items }: { items: Comment[] }) {
  return (
    <ul className={Styles["reply-lists"]}>
      {items?.map((item) => (
        <li key={item?.id} className={Styles["reply-list"]}>
          <p className={Styles["content"]}>{item?.content}</p>
          <div className={Styles["reply-list__info"]}>
            <figure className={Styles["reply-list__writer-img"]}>
              <Image width="32" height="32" src={item?.writer?.image ?? userImg} alt="댓글 작성자 프로필" />
            </figure>
            <div className={Styles["reply-list__writer-info"]}>
              <strong className={Styles["writer"]}>{item?.writer?.nickname}</strong>
              <em className={Styles["time"]}>{`${getTime(item.updatedAt)}`}</em>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
