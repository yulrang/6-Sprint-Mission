import Styles from "./ReplyList.module.scss";

const getTime = (updatedTime) => {
  const UPDATED_TIME = new Date(updatedTime);
  const NOW = new Date();

  let result = Math.ceil((NOW - UPDATED_TIME) / 1000 / 60 / 60 / 24);

  if (result >= 24) {
    result = Math.ceil(result / 24) + "일 전";
  } else {
    result = result + "시간 전";
  }
  return result;
};

export function ReplyList({ items }) {
  return (
    <ul className={Styles["reply-lists"]}>
      {items?.map((item) => {
        return (
          <li className={Styles["reply-list"]}>
            <p className={Styles["content"]}>{item?.content}</p>
            <div className={Styles["reply-list__info"]}>
              <figure className={Styles["reply-list__writer-img"]}>
                <img src={item?.writer?.image} alt="댓글 작성자 프로필" />
              </figure>
              <div className={Styles["reply-list__writer-info"]}>
                <strong className={Styles["writer"]}>
                  {item?.writer?.nickname}
                </strong>
                <em className={Styles["time"]}>
                  {`${getTime(item.updatedAt)}`}
                </em>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
