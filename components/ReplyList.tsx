import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { deleteComment, EditComment } from "@/src/api/api";
import userImg from "@/src/img/ic_profile.svg";
import icoKebab from "@/src/img/ic_kebab.svg";
import { Comment } from "@/src/types/product";
import { useAuth } from "@/src/contexts/AuthProvider";
import Input from "./Input";
import Button from "./Button/Button";
import Styles from "./ReplyList.module.scss";

const formatTimeAgo = (dateString: Date): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

  const years = Math.round(diffInSeconds / (60 * 60 * 24 * 365));
  const months = Math.round(diffInSeconds / (60 * 60 * 24 * 30));
  const days = Math.round(diffInSeconds / (60 * 60 * 24));
  const hours = Math.round(diffInSeconds / (60 * 60));
  const minutes = Math.round(diffInSeconds / 60);

  const timeUnits = [
    { unit: "년", value: years },
    { unit: "달", value: months },
    { unit: "일", value: days },
    { unit: "시간", value: hours },
    { unit: "분", value: minutes },
    { unit: "초", value: diffInSeconds },
  ];

  for (const { unit, value } of timeUnits) {
    if (value > 0) {
      return `${value}${unit} 전`;
    }
  }

  return "방금 전";
};

interface ReplyProps {
  item: Comment;
}
export function Reply({ item }: ReplyProps) {
  const [isPopMenu, setIsPopMenu] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const { user } = useAuth(true);

  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    setOnEdit(true);
    setIsPopMenu(false);
  };
  const handleReplySubmit = async (id: number) => {
    const response = await EditComment(String(id), { content: comment });
    if (!response) return;

    setOnEdit(false);
    router.reload();
  };

  const handleSubmit = (id: number) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleReplySubmit(id);
  };

  const handleDelete = (id: number) => async () => {
    await deleteComment(String(id));
  };

  return (
    <>
      <div className={Styles["reply-list__content"]}>
        {onEdit ? (
          <form onSubmit={handleSubmit(item.id)} className={Styles["edit-comment"]}>
            <Input.Textarea name="comment" value={comment === "" ? item?.content : comment} className="input-theme txt-comment" placeholder="댓글을 입력해주세요." onChange={handleChange} />
            <span className={Styles["btn-wrap"]}>
              <Button type="button" id="cancel-comment" size="small" className={Styles["btn-cancel"]} disabled={false} onClick={() => setOnEdit(false)}>
                취소
              </Button>
              <Button type="submit" id="submit-comment" size="small" className="btn-comment" disabled={item.content === ""}>
                수정 완료
              </Button>
            </span>
          </form>
        ) : (
          <p className={Styles.content}>{item?.content}</p>
        )}
        {!onEdit && item.writer.id === user?.id && (
          <button type="button" className={Styles["btn-more"]} onClick={() => setIsPopMenu(!isPopMenu)}>
            <Image width="24" height="24" src={icoKebab} alt="더보기" />
          </button>
        )}
        {isPopMenu && (
          <ul className="pop-menu">
            <li>
              <button type="button" className="pop-menu_btn" onClick={handleEdit}>
                수정하기
              </button>
            </li>
            <li>
              <button type="button" className="pop-menu_btn" onClick={handleDelete(item?.id)}>
                삭제하기
              </button>
            </li>
          </ul>
        )}
      </div>
      <div className={Styles["reply-list__info"]}>
        <figure className={Styles["reply-list__writer-img"]}>
          <Image width="32" height="32" src={item?.writer?.image ?? userImg} alt="댓글 작성자 프로필" />
        </figure>
        <div className={Styles["reply-list__writer-info"]}>
          <strong className={Styles.writer}>{item?.writer?.nickname}</strong>
          <em className={Styles.time}>{`${formatTimeAgo(item.updatedAt)}`}</em>
        </div>
      </div>
    </>
  );
}

export default function ReplyList({ items }: { items: Comment[] }) {
  return (
    <ul className={Styles["reply-lists"]}>
      {items?.map((item) => (
        <li key={item?.id} className={Styles["reply-list"]}>
          <Reply item={item} />
        </li>
      ))}
    </ul>
  );
}
