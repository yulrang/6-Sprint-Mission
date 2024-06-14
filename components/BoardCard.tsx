import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Styles from "./BoardCard.module.scss";
import { useAsync } from "@/src/hooks/useAsync";
import { getArticles } from "@/src/api/api";
import icoHeart from "@/src/img/ic_heart.svg";
import icoMedal from "@/src/img/ic_medal.svg";
import { Article } from "@/src/types/article";
import Link from "next/link";

interface ArticleListProps {
  order: string;
  pageSize: number;
}

export function BoardCard({ order, pageSize }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, loadingError, getArticlesAsync] = useAsync(getArticles);

  const handleLoad = useCallback(
    async (options: ArticleListProps) => {
      if (typeof getArticlesAsync !== "function") {
        console.error("getArticlesAsync is not a function");
        return;
      }

      let result = await getArticlesAsync(options);
      if (!result) return;

      const { list } = result;

      setArticles(list);
    },
    [getArticlesAsync]
  );

  useEffect(() => {
    handleLoad({ order, pageSize });
  }, [order, pageSize, handleLoad]);

  return (
    <ul className={`${Styles.boardCardLists}`}>
      {articles.map((article) => {
        return (
          <li key={article.id} className={Styles.boardCardList}>
            <article className={Styles.article}>
              <div className={Styles.flag}>
                <Image
                  width="16"
                  height="16"
                  src={icoMedal}
                  alt="아이콘"
                  aria-hidden="true"
                />
                <span className={Styles.name}>Best</span>
              </div>
              <h3 className={Styles.title}>
                <Link href={`boards/${article.id}`} className={Styles.link}>
                  <span>{article.title}</span>
                  {article.image && (
                    <figure className={Styles.image}>
                      <Image
                        width="72"
                        height="72"
                        src={article.image}
                        alt="이미지"
                      />
                    </figure>
                  )}
                </Link>
              </h3>
              <div className={Styles.info}>
                <span className={Styles.wrap}>
                  <strong className={Styles.writer}>
                    {article.writer.nickname}
                  </strong>
                  <span className={Styles.like}>
                    <Image
                      width="16"
                      height="16"
                      src={icoHeart}
                      alt="좋아요 수"
                    />
                    <em className={Styles.count}>{article.likeCount}</em>
                  </span>
                </span>
                <em className={Styles.date}>
                  {new Date(article.createdAt).toLocaleDateString("ko-KR")}
                </em>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
