import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useAsync from "@/src/hooks/useAsync";
import { getArticles } from "@/src/api/api";
import icoHeart from "@/src/img/ic_heart.svg";
import ImgProductEmpty from "@/src/img/Img_product_empty-sm.png";
import { Article } from "@/src/types/article";
import Link from "next/link";
import WriterInfo from "./WriterInfo";
import Styles from "./BoardList.module.scss";

interface ArticleListProps {
  order: string;
  keyword: string;
  page: number;
  pageSize: number;
}

export default function BoardList({ order = "", pageSize = 0, keyword = "", page = 1 }: ArticleListProps) {
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
    handleLoad({ order, page, pageSize, keyword });
  }, [order, keyword, page, pageSize, handleLoad]);

  return (
    <>
      {isLoading && (
        <div className={`${Styles.boardLists} ${Styles.skeleton}`}>
          <div className={Styles.article}>
            <div className={Styles.main} />
            <div className={Styles.info} />
          </div>
          <div className={Styles.article}>
            <div className={Styles.main} />
            <div className={Styles.info} />
          </div>
          <div className={Styles.article}>
            <div className={Styles.main} />
            <div className={Styles.info} />
          </div>
        </div>
      )}
      {loadingError && (
        <p className="error">
          <span className="error-txt">데이터를 불러오는데 실패했습니다.</span>
        </p>
      )}
      <ul className={`${Styles.boardLists} ${Styles.best}`}>
        {articles.map((article) => (
          <li key={article.id} className={Styles.boardList}>
            <article className={Styles.article}>
              <div className={Styles.main}>
                <h3 className={Styles.title}>
                  <Link href={`boards/${article.id}`} className={Styles.link}>
                    {article.title}
                  </Link>
                </h3>
                {article.image && (
                  <figure className={Styles.image}>
                    <Image width="72" height="72" src={article?.image ?? ImgProductEmpty} alt="이미지" />
                  </figure>
                )}
              </div>
              <div className={Styles.info}>
                <WriterInfo article={article} />
                <span className={Styles.wrap}>
                  <Image width="24" height="24" src={icoHeart} alt="좋아요 수" />
                  <em className={Styles.count}>{article.likeCount}</em>
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
