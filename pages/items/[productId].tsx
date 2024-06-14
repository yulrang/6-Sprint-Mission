"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getItemComments, getItemDetail } from "@/src/api/api";
import { useAsync } from "@/src/hooks/useAsync";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ReplyList } from "@/components/ReplyList";
import Header from "@/components/Header";
import icoHeart from "@/src/img/ic_heart.svg";
import icoKebab from "@/src/img/ic_kebab.svg";
import icoBack from "@/src/img/ic_back.svg";
import { Item } from "@/src/types/item";

const defaultProduct: Item = {
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

export default function ItemDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;
  const [product, setProduct] = useState<Item>(defaultProduct);
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
    [getItemDetailAsync, getItemCommentsAsync, productId]
  );

  useEffect(() => {
    handleLoad(productId);
  }, [handleLoad]);

  return (
    <>
      <Header />
      <div className="section-wrap">
        <section className="section-detail">
          <div className="section-img">
            <img
              src={product.images}
              alt="상품 이미지"
              className="detail-img"
            />
          </div>
          <div className="section-content">
            <div className="section-row">
              <h2 className="section-tit">
                <span className="detail-tit">{product.name}</span>
                <button type="button" className="btn-more">
                  <Image width="24" height="24" src={icoKebab} alt="더보기" />
                </button>
              </h2>
              <strong className="detail-price">
                {product.price.toLocaleString()}원
              </strong>
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
                <Image width="32" height="32" src={icoHeart} alt="좋아요" />
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
