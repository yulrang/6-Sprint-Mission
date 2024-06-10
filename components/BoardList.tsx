import { useCallback, useEffect, useState } from "react";
import Styles from "./BoardList.module.scss";
import { useAsync } from "src/hooks/useAsync";
import { getArticles } from "src/api/api";
import Image from "next/image";
import icoProfile from "src/img/ic_profile.svg";
import icoHeart from "src/img/ic_heart.svg";
import { Article } from "src/types/article";

interface articleListProps {
  order: string;
  keyword?: string;
  page?: number;
  pageSize: number;
}

export function BoardList({
  order = "",
  pageSize = 0,
  keyword = "",
  page = undefined,
}: articleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, loadingError, getArticlesAsync] = useAsync(getArticles);

  const handleLoad = useCallback(
    async (options: articleListProps) => {
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

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleLoad({ order, page, pageSize, keyword });
  };

  useEffect(() => {
    handleLoad({ order, page, pageSize, keyword });
  }, [order, keyword, page, pageSize, handleLoad]);

  return (
    <ul className={`${Styles.boardLists} ${Styles.best}`}>
      {articles.map((article) => {
        return (
          <li key={article.id} className={Styles.boardList}>
            <article className={Styles.article}>
              <div className={Styles.main}>
                <h3 className={Styles.title}>{article.title}</h3>
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
              </div>
              <div className={Styles.info}>
                <span className={Styles.wrap}>
                  <figure className={Styles.profile}>
                    <Image
                      width="24"
                      height="24"
                      src={icoProfile}
                      alt="프로필"
                    />
                  </figure>
                  <strong className={Styles.writer}>
                    {article.writer.nickname}
                  </strong>
                  <em className={Styles.date}>
                    {new Date(article.createdAt).toLocaleDateString("ko-KR")}
                  </em>
                </span>
                <span className={Styles.wrap}>
                  <Image
                    width="24"
                    height="24"
                    src={icoHeart}
                    alt="좋아요 수"
                  />
                  <em className={Styles.count}>{article.likeCount}</em>
                </span>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
