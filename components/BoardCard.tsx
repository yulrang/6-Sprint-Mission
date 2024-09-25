import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useAsync from "@/src/hooks/useAsync";
import { getArticles } from "@/src/api/api";
import icoHeart from "@/src/img/ic_heart.svg";
import icoMedal from "@/src/img/ic_medal.svg";
import { Article } from "@/src/types/article";
import Styles from "./BoardCard.module.scss";

interface ArticleListProps {
  order: string;
  pageSize: number;
}

export default function BoardCard({ order, pageSize }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, loadingError, getArticlesAsync] = useAsync(getArticles);

  const handleLoad = useCallback(
    async (options: ArticleListProps) => {
      if (typeof getArticlesAsync !== "function") {
        /* eslint-disable no-console */
        console.error("getArticlesAsync is not a function");
        return;
      }

      const result = await getArticlesAsync(options);
      if (!result) return;

      const { list } = result;

      setArticles(list);
    },
    [getArticlesAsync],
  );

  useEffect(() => {
    handleLoad({ order, pageSize });
  }, [order, pageSize, handleLoad]);

  return (
    <>
      {isLoading && (
        <div className={`${Styles.boardCardLists} ${Styles.skeleton}`}>
          <div className={Styles.article} />
          <div className={Styles.article} />
          <div className={Styles.article} />
        </div>
      )}
      {loadingError && (
        <p className="error">
          <span className="error-txt">데이터를 불러오는데 실패했습니다.</span>
        </p>
      )}
      <ul className={`${Styles.boardCardLists}`}>
        {articles.map((article) => (
          <li key={article.id} className={Styles.boardCardList}>
            <article className={Styles.article}>
              <div className={Styles.flag}>
                <Image width="16" height="16" src={icoMedal} alt="아이콘" aria-hidden="true" />
                <span className={Styles.name}>Best</span>
              </div>
              <h3 className={Styles.title}>
                <Link href={`boards/${article.id}`} className={Styles.link}>
                  <span>{article.title}</span>
                  {article.image && (
                    <figure className={Styles.image}>
                      <Image width="72" height="72" src={article.image} alt="이미지" />
                    </figure>
                  )}
                </Link>
              </h3>
              <div className={Styles.info}>
                <span className={Styles.wrap}>
                  <strong className={Styles.writer}>{article.writer.nickname}</strong>
                  <span className={Styles.like}>
                    <Image width="16" height="16" src={icoHeart} alt="좋아요 수" />
                    <em className={Styles.count}>{article.likeCount}</em>
                  </span>
                </span>
                <em className={Styles.date}>{new Date(article.createdAt).toLocaleDateString("ko-KR")}</em>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
