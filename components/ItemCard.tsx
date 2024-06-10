import Link from "next/link";
import Styles from "./ItemCard.module.scss";
import icoHeart from "src/img/ic_heart.svg";
import Image from "next/image";
import { Item } from "src/types/item";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <>
      <div className={Styles["img-wrap"]}>
        <Link href={`/items/${item.id}`} className="link">
          <img
            width="221"
            height="221"
            src={item?.images[0]}
            alt={item.name + " 이미지"}
            className={Styles.img}
          />
        </Link>
      </div>
      <div className={Styles.content}>
        <h2 className={Styles.title}>
          <Link href={`/items/${item.id}`} className={Styles.link}>
            {item.description}
          </Link>
        </h2>
        <p className={Styles.price}>{item.price.toLocaleString()}원</p>
        <p className={Styles.favorite}>
          <Image width="16" height="16" src={icoHeart} alt="좋아요" />
          <span>{item.favoriteCount}</span>
        </p>
      </div>
    </>
  );
}
