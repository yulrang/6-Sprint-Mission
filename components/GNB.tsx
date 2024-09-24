import { usePathname } from "next/navigation";
import Link from "next/link";
import Styles from "./GNB.module.scss";

export default function GNB() {
  const pathname = usePathname();

  return (
    <ul className={Styles.gnb}>
      <li className={Styles["gnb-list"]}>
        <Link href="/boards" className={pathname?.includes("/boards") || pathname?.includes("/addboard") ? `${Styles.link} ${Styles.on}` : Styles.link}>
          자유게시판
        </Link>
      </li>
      <li className={Styles["gnb-list"]}>
        <Link href="/items" className={pathname?.includes("/items") || pathname?.includes("/additem") ? `${Styles.link} ${Styles.on}` : Styles.link}>
          중고마켓
        </Link>
      </li>
    </ul>
  );
}
