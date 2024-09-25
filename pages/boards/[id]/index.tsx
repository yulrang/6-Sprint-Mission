import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import ReplyList from "@/components/ReplyList";
import Header from "@/components/Header";
import icoKebab from "@/src/img/ic_kebab.svg";
import icoBack from "@/src/img/ic_back.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ImgReplyEmpty from "@/src/img/Img_reply_empty.png";
import { useInView } from "react-intersection-observer";
import { deleteArticle, deleteLike, getArticleComments, getArticleDetail, postArticleComment, postLike } from "@/src/api/api";
import WriterInfo from "@/components/WriterInfo";
import icoHeart from "@/src/img/ic_heart.svg";
import icoHeartOn from "@/src/img/ic_heart_on.svg";
import { Comment } from "@/src/types/product";
import { Article } from "@/src/types/article";
import { useAuth } from "@/src/contexts/AuthProvider";

export default function ItemDetailPage() {
  const router = useRouter();
  const { user } = useAuth(true);
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [like, setLike] = useState(false);
  const [likeTotal, setLikeTotal] = useState(0);
  const [comment, setComment] = useState<string>("");
  const [limit] = useState(5);
  const [cursor, setCursor] = useState(0);
  const [isPopMenu, setIsPopMenu] = useState(false);
  const [ref, inView] = useInView();

  const fetchArticleData = async () => {
    if (id) {
      const articleRes = await getArticleDetail(String(id));
      setArticle(articleRes);
      setLikeTotal(articleRes.likeCount);
    }
  };

  const fetchComments = async () => {
    if (id && cursor !== null) {
      const newComments = await getArticleComments(String(id), limit, cursor);
      setCursor(newComments.nextCursor);
      setComments((prevValues) => [...prevValues, ...newComments.list]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleLike = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      await postLike(String(article?.id));
      setLikeTotal((prevNum) => prevNum + 1);
      setLike(true);
    } else {
      await deleteLike(String(article?.id));
      setLikeTotal((prevNum) => prevNum - 1);
      setLike(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await postArticleComment(String(article?.id), { content: comment });
    if (!response) return;

    setComment("");
    fetchComments(); // 새로운 댓글이 추가되면 댓글 목록 갱신
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/boards/${article?.id}/edit`);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await deleteArticle(String(article?.id));
    if (!response) return;

    router.push("/boards");
  };

  useEffect(() => {
    fetchArticleData();
  }, [id]);

  useEffect(() => {
    if (inView && cursor !== null) {
      fetchComments();
    }
  }, [inView, id]);

  return (
    <>
      <Header />
      <div className="section-wrap">
        <section className="section-detail">
          <div className="section-content">
            <div className="section-row">
              <div>
                <h2 className="section-tit">
                  <span className="detail-tit">{article?.title}</span>
                  {article?.writer?.id === user?.id && (
                    <button type="button" className="btn-more" onClick={() => setIsPopMenu(!isPopMenu)}>
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
                        <button type="button" className="pop-menu_btn" onClick={handleDelete}>
                          삭제하기
                        </button>
                      </li>
                    </ul>
                  )}
                </h2>
              </div>
              <div>
                <ul className="info-list">
                  <li>{article && <WriterInfo article={article} />}</li>
                  <li>
                    <span className="like">
                      <input type="checkbox" id="chk_like" className="chk_like" onChange={handleLike} />
                      <label htmlFor="chk_like" className="lab_like">
                        <Image width="24" height="24" src={like ? icoHeartOn : icoHeart} alt="좋아요 수" />
                      </label>
                      <em className="count">{likeTotal}</em>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <hr className="line" />
        <section className="section-article-content">
          <div>{article?.content}</div>
          {article?.image && (
            <figure>
              <Image width="72" height="72" src={article?.image} alt="이미지" className="content-img" />
            </figure>
          )}
        </section>
        <section className="section-comment">
          <h3 className="section-tit">댓글 달기</h3>
          <form onSubmit={handleReplySubmit}>
            <div className="section-content">
              <Input.Textarea name="comment" value={comment} className="input-theme txt-comment" placeholder="댓글을 입력해주세요." onChange={handleChange} />
              <Button type="submit" id="submit-comment" size="small" className="btn-comment" disabled={comment === ""}>
                등록
              </Button>
            </div>
          </form>
        </section>
        <section className="section-replyList">
          <ReplyList items={comments} />
          <div className="h-10" ref={ref} />
          {comments.length === 0 && (
            <div className="no-reply">
              <Image src={ImgReplyEmpty} width={140} height={140} alt="댓글 이미지" />
              <p>아직 댓글이 없어요.</p>
              <p>지금 댓글을 달아보세요!</p>
            </div>
          )}
        </section>
        <section className="section-btn">
          <Link href="/boards" className="btn-list">
            <span>목록으로 돌아가기</span>
            <Image width="24" height="24" src={icoBack} aria-hidden="true" alt="아이콘" />
          </Link>
        </section>
      </div>
    </>
  );
}
