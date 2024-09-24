import Image from "next/image";
import userImg from "@/src/img/ic_profile.svg";
import Styles from "./ReplyList.module.scss";
import { Comment } from "@/src/types/product";
import icoKebab from "@/src/img/ic_kebab.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/src/contexts/AuthProvider";
import { Router, useRouter } from "next/router";
import Input from "./Input";
import Button from "./Button/Button";
import { deleteComment, EditComment } from "@/src/api/api";

const formatTimeAgo = (dateString: Date): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

  const years = Math.round(diffInSeconds / (60 * 60 * 24 * 365));
  const months = Math.round(diffInSeconds / (60 * 60 * 24 * 30));
  const days = Math.round(diffInSeconds / (60 * 60 * 24));
  const hours = Math.round(diffInSeconds / (60 * 60));
  const minutes = Math.round(diffInSeconds / 60);

  if (years > 0) {
    return `${years}년 전`;
  } else if (months > 0) {
    return `${months}달 전`;
  } else if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${diffInSeconds}초 전`;
  }
};

export default function ReplyList({ items }: { items: Comment[] }) {
  return (
    <>
      <ul className={Styles["reply-lists"]}>
        {items?.map((item) => (
          <li key={item?.id} className={Styles["reply-list"]}>
            <Reply item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

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

  const handleDelete = (id: number) => async (e: FormEvent<HTMLButtonElement>) => {
    const response = await deleteComment(String(id));
    if (!response) return;
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
          <p className={Styles["content"]}>{item?.content}</p>
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
          <strong className={Styles["writer"]}>{item?.writer?.nickname}</strong>
          <em className={Styles["time"]}>{`${formatTimeAgo(item.updatedAt)}`}</em>
        </div>
      </div>
    </>
  );
}
