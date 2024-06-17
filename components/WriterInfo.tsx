import Image from "next/image";
import Styles from "./WriterInfo.module.scss";
import icoProfile from "@/src/img/ic_profile.svg";
import { Article } from "@/src/types/article";

export default function WriterInfo({ article }: { article: Article }) {
  return (
    <span className={Styles.wrap}>
      <figure className={Styles.profile}>
        <Image width="24" height="24" src={icoProfile} alt="프로필" />
      </figure>
      <strong className={Styles.writer}>{article.writer.nickname}</strong>
      <em className={Styles.date}>{new Date(article.createdAt).toLocaleDateString("ko-KR")}</em>
    </span>
  );
}
