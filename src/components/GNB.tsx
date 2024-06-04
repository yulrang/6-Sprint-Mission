import Styles from "./GNB.module.scss";
import { NavLink } from "react-router-dom";

interface getLinkClassProps {
  isActive: boolean;
}

function getLinkClass({ isActive }: getLinkClassProps) {
  return isActive ? `${Styles.link} ${Styles.on}` : Styles.link;
}

export function GNB() {
  return (
    <ul className={Styles.gnb}>
      <li className={Styles["gnb-list"]}>
        <NavLink to="/" className={getLinkClass}>
          자유게시판
        </NavLink>
      </li>
      <li className={Styles["gnb-list"]}>
        <NavLink to={"/items"} className={getLinkClass}>
          중고마켓
        </NavLink>
      </li>
    </ul>
  );
}
