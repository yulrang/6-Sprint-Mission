import Image from "next/image";
import { ReactNode } from "react";
import LogoImg from "src/img/logo_img.png";
import LogoTypo from "src/img/logo_typo.png";

interface LogoProps {
  children: string;
}
export function Logo({ children }: LogoProps) {
  return (
    <h1 className="header__logo">
      <picture className="img-logo">
        <source srcSet={LogoTypo} media="(max-width: 768px)" width="103" />
        <source srcSet={LogoImg} media="(min-width: 769px)" width="153" />
        <Image width="153" height="51" src={LogoImg} alt="판다마켓 로고" />
      </picture>
      <span className="blind">{children}</span>
    </h1>
  );
}
