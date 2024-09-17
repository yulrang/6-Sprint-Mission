import Link from "next/link";
import Image from "next/image";
import ImgUser from "@/src/img/ic_profile.svg";
import { useAuth } from "@/src/contexts/AuthProvider";
import Logo from "./Logo";
import GNB from "./GNB";

export default function Header() {
  const { isAuth } = useAuth(true);

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
          {isAuth ? (
            <Image src={ImgUser} width={40} height={40} alt="유저 이미지" />
          ) : (
            <Link href="/signin" className="btn-login">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
