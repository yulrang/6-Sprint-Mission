import { Link } from "react-router-dom";
import Styles from "./ItemCard.module.scss";
import icoHeart from "../img/ic_heart.svg";

interface ItemCardProps {
  item: {
    id: number;
    images: string[];
    name: string;
    description: string;
    price: number;
    favoriteCount: number;
  };
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <>
      <div className={Styles["img-wrap"]}>
        <Link to={`/items/${item.id}`} className="link">
          <img
            src={item.images[0]}
            alt={item.name + " 이미지"}
            className={Styles.img}
          />
        </Link>
      </div>
      <div className={Styles.content}>
        <h2 className={Styles.title}>
          <Link to={`/items/${item.id}`} className={Styles.link}>
            {item.description}
          </Link>
        </h2>
        <p className={Styles.price}>{item.price.toLocaleString()}원</p>
        <p className={Styles.favorite}>
          <img src={icoHeart} alt="좋아요" />
          <span>{item.favoriteCount}</span>
        </p>
      </div>
    </>
  );
}
