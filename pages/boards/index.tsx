"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useResponsive from "@/src/hooks/useResponsive";
import Input from "@/components/Input";
import BoardList from "@/components/BoardList";
import BoardCard from "@/components/BoardCard";
import Header from "@/components/Header";
import { useInView } from "react-intersection-observer";

export default function Page() {
  const [isPC, isTablet, isMobile] = useResponsive();
  const [ref, inView] = useInView();

  const [values, setValues] = useState({
    search: "",
    order: "recent",
    page: 1,
    pageSize: 10,
  });

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const getPageSize = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (isPC) return 3;
    return 1; // 기본값
  };

  useEffect(() => {
    if (inView) {
      setValues((prevValues) => ({
        ...prevValues,
        pageSize: prevValues.pageSize + 10,
      }));
    }
  }, [inView]);

  return (
    <>
      <Header />
      <section className="section-boards">
        <div className="section-wrap">
          <header className="section-header">
            <h2 className="section-tit">베스트 게시글</h2>
          </header>
          <div className="section-content">
            <BoardCard order="like" pageSize={getPageSize()} />
          </div>
        </div>
      </section>
      <section className="section-boards">
        <div className="section-wrap">
          <header className="section-header">
            <div className="section-info">
              <h2 className="section-tit">게시글</h2>
              <Link href="/addboard" className="section-boards__btn">
                글쓰기
              </Link>
            </div>
            <div className="section-info">
              <Input.Search name="search" value={values.search} onSubmit={handleSearch} onChange={handleInputChange} className="section-boards__search" placeholder="검색할 게시글을 입력해주세요." />
              <Input.Select
                selectOptions={[
                  { value: "recent", name: "최신순" },
                  { value: "like", name: "좋아요순" },
                ]}
                name="order"
                value={values.order}
                onChange={handleChange}
                className="section-boards__dropdown"
              />
            </div>
          </header>
          <div className="section-content">
            <BoardList order={values.order} pageSize={values.pageSize} keyword={values.search} page={values.page} />
            <div className="h-10" ref={ref} />
          </div>
        </div>
      </section>
    </>
  );
}
