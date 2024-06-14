"use client";

import GNB from "components/GNB";
import { Logo } from "components/Logo";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
        <div className="view">{children}</div>
      </body>
    </html>
  );
}
