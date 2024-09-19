import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import ReplyList from "@/components/ReplyList";
import Header from "@/components/Header";
import icoHeartOn from "@/src/img/ic_heart_on.svg";
import icoHeart from "@/src/img/ic_heart.svg";
import icoKebab from "@/src/img/ic_kebab.svg";
import icoBack from "@/src/img/ic_back.svg";
import { GetServerSidePropsContext } from "next";
import { deleteItem, deleteProductLike, getProductComments, getProductDetail, postProductComment, postProductLike } from "@/src/api/api";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import ImgProductEmpty from "@/src/img/Img_product_empty.png";
import Router, { useRouter } from "next/router";
import { useAuth } from "@/src/contexts/AuthProvider";
import { Product, Comment } from "@/src/types/product";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let product;
  let comments;
  try {
    const productRes = await getProductDetail(String(id));
    const commentRes = await getProductComments(String(id));
    product = productRes ?? [];
    comments = commentRes ?? [];
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
      comments,
    },
  };
}

export default function ItemDetailPage({ product, comments }: { product: Product; comments: Comment[] }) {
  const { user } = useAuth(true);
  const [isPopMenu, setIsPopMenu] = useState(false);
  const [likeTotal, setLikeTotal] = useState<number>(product.favoriteCount);
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleLike = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      await postProductLike(product.id);
      setLikeTotal((prevNum) => prevNum + 1);
    } else {
      await deleteProductLike(product.id);
      setLikeTotal((prevNum) => prevNum - 1);
    }
  };

  const handleReplySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await postProductComment(product.id, { content: comment });
    if (!response) return;

    setComment("");
    router.reload();
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    Router.push(`/items/${product.id}/edit`);
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();

    const response = await deleteItem(product.id);
    if (!response) return;

    Router.push("/items");
  };

  return (
    <>
      <Header />
      <div className="section-wrap">
        <section className="section-detail">
          <div className="section-img">
            <Image src={product?.images[0] ?? ImgProductEmpty} width={486} height={486} alt="상품 이미지" className="detail-img" />
          </div>
          <div className="section-content">
            <div className="section-row">
              <h2 className="section-tit">
                <span className="detail-tit">{product.name}</span>
                {product.ownerId === user?.id && (
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
              <strong className="detail-price">{product.price?.toLocaleString()}원</strong>
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
                  <ul className="tag-container">{product.tags?.map((tag: string) => <li className="tag-view__list">{tag}</li>)}</ul>
                </div>
              </section>
            </div>
            <div className="section-row">
              <span className="like">
                <input type="checkbox" id="chk_like" className="chk_like" checked={product.isFavorite} onChange={handleLike} />
                <label htmlFor="chk_like" className="lab_like">
                  <Image width="24" height="24" src={product.isFavorite ? icoHeartOn : icoHeart} alt="좋아요 수" />
                </label>
                <em className="count">{likeTotal}</em>
              </span>
            </div>
          </div>
        </section>
        <hr className="line" />
        <section className="section-comment">
          <h3 className="section-tit">문의하기</h3>
          <form onSubmit={handleReplySubmit}>
            <div className="section-content">
              <Input.Textarea
                name="comment"
                className="input-theme txt-comment"
                placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                onChange={handleChange}
              />
              <Button type="submit" id="submit-comment" size="small" className="btn-comment" disabled={comment === ""}>
                등록
              </Button>
            </div>
          </form>
        </section>
        <section className="section-reply">
          <ReplyList items={comments} />
        </section>
        <section className="section-btn">
          <Link href="/items" className="btn-list">
            <span>목록으로 돌아가기</span>
            <Image width="24" height="24" src={icoBack} aria-hidden="true" alt="아이콘" />
          </Link>
        </section>
      </div>
    </>
  );
}
