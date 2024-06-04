import LogoTypo from "img/logo_typo.png";
import Logo from "img/logo_img.png";
import MainImg01 from "img/Img_home_01.png";
import MainImg02 from "img/Img_home_02.png";
import MainImg03 from "img/Img_home_03.png";
import IcoFacebook from "img/ic_facebook.svg";
import IcoYoutube from "img/ic_youtube.svg";
import IcoTwitter from "img/ic_twitter.svg";
import IcoInstagram from "img/ic_instagram.svg";
import { Link } from "react-router-dom";
import "./HomePage.scss";

export function HomePage() {
  return (
    <div className="wrap wrap-index">
      <header className="header">
        <div className="header-wrap">
          <h1 className="header__logo">
            <a href="/" className="link">
              <picture className="img-logo">
                <source
                  srcSet={LogoTypo}
                  media="(max-width: 768px)"
                  width="103"
                />
                <source srcSet={Logo} media="(min-width: 769px)" width="153" />
                <img src={Logo} alt="판다마켓 로고" />
              </picture>
              <span className="blind">판다마켓</span>
            </a>
          </h1>
          <div className="header__btn">
            <Link to="/signin" className="btn-login">
              로그인
            </Link>
          </div>
        </div>
      </header>
      <div className="view">
        <section className="section-banner top">
          <div className="section-wrap">
            <h2 className="section-banner__tit">
              일상의 모든 물건을 거래해보세요
            </h2>
            <div className="section-banner__btn">
              <Link to="/items" className="link">
                구경하러 가기
              </Link>
            </div>
          </div>
        </section>
        <main className="main">
          <section className="section-desc">
            <div className="section-wrap">
              <div className="section-desc__img">
                <img src={MainImg01} alt="인기 상품 이미지" />
              </div>
              <div className="section-desc__content">
                <strong className="topic">Hot item</strong>
                <h3 className="tit">인기 상품을 확인해 보세요</h3>
                <div className="content">
                  <p>가장 HOT한 중고거래 물품을</p>
                  <p>판다 마켓에서 확인해 보세요</p>
                </div>
              </div>
            </div>
          </section>
          <section className="section-desc right">
            <div className="section-wrap">
              <div className="section-desc__img">
                <img src={MainImg02} alt="상품 검색 이미지" />
              </div>
              <div className="section-desc__content">
                <strong className="topic">Search</strong>
                <h3 className="tit">구매를 원하는 상품을 검색하세요</h3>
                <div className="content">
                  <p>구매하고 싶은 물품은 검색해서</p>
                  <p>쉽게 찾아보세요</p>
                </div>
              </div>
            </div>
          </section>
          <section className="section-desc">
            <div className="section-wrap">
              <div className="section-desc__img">
                <img src={MainImg03} alt="상품 등록 이미지" />
              </div>
              <div className="section-desc__content">
                <strong className="topic">Register</strong>
                <h3 className="tit">판매를 원하는 상품을 등록하세요</h3>
                <div className="content">
                  <p>어떤 물건이든 판매하고 싶은 상품을</p>
                  <p>쉽게 등록하세요</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <section className="section-banner bottom">
          <div className="section-wrap">
            <h2 className="section-banner__tit">
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h2>
          </div>
        </section>
      </div>
      <footer className="footer">
        <h1 className="footer__tit">©codeit - 2024</h1>
        <ul className="footer__nav">
          <li>
            <a href="/privacy" className="link">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/faq" className="link">
              FAQ
            </a>
          </li>
        </ul>
        <ul className="footer__sns">
          <li>
            <a href="https://facebook.com" target="_blank">
              <img
                src={IcoFacebook}
                alt="facebook 아이콘"
                className="img-sns"
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank">
              <img src={IcoTwitter} alt="twitter 아이콘" className="img-sns" />
            </a>
          </li>
          <li>
            <a href="https://youtube.com" target="_blank">
              <img src={IcoYoutube} alt="youtube 아이콘" className="img-sns" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank">
              <img
                src={IcoInstagram}
                alt="instagram 아이콘"
                className="img-sns"
              />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
