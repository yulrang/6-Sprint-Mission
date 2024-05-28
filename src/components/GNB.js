import Styles from "./GNB.module.scss";
import { NavLink } from "react-router-dom";

function getLinkClass({ isActive }) {
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
        <NavLink to={["/items", "/additem"]} className={getLinkClass}>
          중고마켓
        </NavLink>
      </li>
    </ul>
  );
}
