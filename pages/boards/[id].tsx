import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import { ReplyList } from "@/components/ReplyList";
import Header from "@/components/Header";
import icoKebab from "@/src/img/ic_kebab.svg";
import icoBack from "@/src/img/ic_back.svg";
import { Item } from "@/src/types/item";
import { GetServerSidePropsContext } from "next";
import { getArticleComments, getArticleDetail } from "@/src/api/api";
import { WriterInfo } from "@/components/WriterInfo";
import icoHeart from "@/src/img/ic_heart.svg";
import { ChangeEvent, useRef, useState } from "react";

const defaultarticle: Item = {
  id: 0,
  createdAt: "",
  updatedAt: "",
  ownerId: 0,
  name: "",
  images: "",
  price: 0,
  description: "",
  tags: [""],
  favoriteCount: 0,
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let article;
  let comments;
  try {
    const articleRes = await getArticleDetail(String(id));
    const commentRes = await getArticleComments(String(id));
    article = articleRes ?? [];
    comments = commentRes ?? [];
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      article,
      comments,
    },
  };
}

export default function ItemDetailPage({
  article,
  comments,
}: {
  article: any;
  comments: any;
}) {
  const [isCommentDisabled, setIsCommentDisabled] = useState(true);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsCommentDisabled(e.target.value === "" ? true : false);
  };
  return (
    <>
      <Header />
      <div className="section-wrap">
        <section className="section-detail">
          <div className="section-content">
            <div className="section-row">
              <div>
                <h2 className="section-tit">
                  <span className="detail-tit">{article.title}</span>
                  <button type="button" className="btn-more">
                    <Image width="24" height="24" src={icoKebab} alt="더보기" />
                  </button>
                </h2>
              </div>
              <div>
                <ul className="info-list">
                  <li>
                    <WriterInfo article={article} />
                  </li>
                  <li>
                    <span className="like">
                      <Image
                        width="24"
                        height="24"
                        src={icoHeart}
                        alt="좋아요 수"
                      />
                      <em className="count">{article.likeCount}</em>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <hr className="line" />
        <section className="section-article-content">
          <div>{article.content}</div>
          {article.image && (
            <figure>
              <Image
                width="72"
                height="72"
                src={article.image}
                alt="이미지"
                className="content-img"
              />
            </figure>
          )}
        </section>
        <section className="section-comment">
          <h3 className="section-tit">댓글 달기</h3>
          <div className="section-content">
            <Input.Textarea
              name="comment"
              className="input-theme txt-comment"
              placeholder="댓글을 입력해주세요."
              onChange={handleChange}
            />
            <Button
              size="small"
              className="btn-comment"
              disabled={isCommentDisabled}
            >
              등록
            </Button>
          </div>
        </section>
        <section className="section-reply">
          <ReplyList items={comments} />
        </section>
        <section className="section-btn">
          <Link href="/items" className="btn-list">
            <span>목록으로 돌아가기</span>
            <Image
              width="24"
              height="24"
              src={icoBack}
              aria-hidden="true"
              alt="아이콘"
            />
          </Link>
        </section>
      </div>
    </>
  );
}
