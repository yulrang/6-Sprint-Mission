import Link from "next/link";
import Logo from "./Logo";
import GNB from "./GNB";
import { useAuth } from "@/src/contexts/AuthProvider";
import Image from "next/image";
import ImgUser from "@/src/img/img_user.svg";

export default function Header() {
  const { user } = useAuth(false);

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
          {user ? (
            <Image src={user?.image ?? ImgUser} width={40} height={40} alt="유저 이미지" />
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
