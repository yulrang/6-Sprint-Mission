import Link from "next/link";
import Logo from "./Logo";
import GNB from "./GNB";

export default function Header() {
  return (
    <header className="header">
      <div className="header-wrap">
        <div className="section-header">
          <Link href="/">
            <Logo>판다마켓</Logo>
          </Link>
          <GNB />
        </div>
        <div>
          <Link href="/signin" className="btn-login">
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
