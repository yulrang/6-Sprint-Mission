import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getItemComments, getItemDetail } from "api/api";
import { useAsync } from "hooks/useAsync";
import Button from "components/Button";
import Input from "components/Input";
import "./ItemDetailPage.scss";
import icoHeart from "img/ic_heart.svg";
import icoKebab from "img/ic_kebab.svg";
import icoBack from "img/ic_back.svg";
import { ReplyList } from "components/ReplyList";

interface Product {
  name: string;
  images: string;
  price: number;
  description: string;
  tags: string[];
  favoriteCount: number;
}
const defaultProduct: Product = {
  name: "",
  images: "",
  price: 0,
  description: "",
  tags: [],
  favoriteCount: 0,
};

export function ItemDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [isItemDetailLoading, itemDetailLoadingError, getItemDetailAsync] =
    useAsync(getItemDetail);
  const [
    isItemCommentsLoading,
    itemCommentsLoadingError,
    getItemCommentsAsync,
  ] = useAsync(getItemComments);

  const handleLoad = useCallback(
    async (productId: string | undefined) => {
      if (
        typeof getItemDetailAsync !== "function" ||
        typeof getItemCommentsAsync !== "function"
      ) {
        console.error(
          "getItemDetailAsync or getItemCommentsAsync is not a function"
        );
        return;
      }

      let productResult = await getItemDetailAsync(productId);
      if (!productResult) return;

      let commentsResult = await getItemCommentsAsync(productId);
      if (!commentsResult) return;

      setProduct(productResult);
      setTags(productResult.tags);
      setComments(commentsResult);
    },
    [getItemDetailAsync]
  );

  useEffect(() => {
    handleLoad(productId);
  }, [handleLoad]);

  return (
    <div className="section-wrap">
      <section className="section-detail">
        <div className="section-img">
          <img src={product.images} alt="상품 이미지" className="detail-img" />
        </div>
        <div className="section-content">
          <div className="section-row">
            <h2 className="section-tit">
              <span className="detail-tit">{product.name}</span>
              <button type="button" className="btn-more">
                <img src={icoKebab} alt="더보기" />
              </button>
            </h2>
            <strong className="detail-price">{product.price}원</strong>
            <hr className="line" />
            <section className="section-detail-content">
              <h3 className="section-tit">상품 소개</h3>
              <div className="section-content">
                <p>{product.description}</p>
              </div>
            </section>
            <section className="section-detail-content">
              <h3 className="section-tit">상품 태그</h3>
              <div className="section-content tag-view">
                <ul className="tag-container">
                  {tags.map((tag) => {
                    return <li className="tag-view__list">{tag}</li>;
                  })}
                </ul>
              </div>
            </section>
          </div>
          <div className="section-row">
            <button type="button" className="btn-heart">
              <img src={icoHeart} width="32" alt="좋아요" />
              <span>{product.favoriteCount}</span>
            </button>
          </div>
        </div>
      </section>
      <hr className="line" />
      <section className="section-comment">
        <h3 className="section-tit">문의하기</h3>
        <div className="section-content">
          <Input.Textarea
            name="comment"
            className="input-theme txt-comment"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <Button.Small className="btn-comment">등록</Button.Small>
        </div>
      </section>
      <section className="section-reply">
        <ReplyList items={comments} />
      </section>
      <section className="section-btn">
        <Link to="/items" className="btn-list">
          <span>목록으로 돌아가기</span>
          <img src={icoBack} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
