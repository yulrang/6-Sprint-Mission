"use client";
import Link from "next/link";
import { useState } from "react";
import { useResponsive } from "@/src/hooks/useResponsive";
import Input from "@/components/Input";
import { BoardList } from "@/components/BoardList";
import { BoardCard } from "@/components/BoardCard";
import Header from "@/components/Header";

export default function Page() {
  const [isPC, isTablet, isMobile] = useResponsive();

  const [values, setValues] = useState({
    search: "",
    order: "recent",
    page: 1,
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

  return (
    <>
      <Header />
      <section className="section-boards">
        <div className="section-wrap">
          <header className="section-header">
            <h2 className="section-tit">베스트 게시글</h2>
          </header>
          <div className="section-content">
            <BoardCard
              order="like"
              pageSize={isMobile ? 1 : isTablet ? 2 : 3}
            />
          </div>
        </div>
      </section>
      <section className="section-boards">
        <div className="section-wrap">
          <header className="section-header">
            <div className="section-info">
              <h2 className="section-tit">게시글</h2>
              <Link href="/additem" className="section-boards__btn">
                글쓰기
              </Link>
            </div>
            <div className="section-info">
              <Input.Search
                name="search"
                value={values.search}
                onSubmit={handleSearch}
                onChange={handleInputChange}
                className="section-boards__search"
                placeholder="검색할 게시글을 입력해주세요."
              />
              <Input.Select
                selectOptions={[
                  { value: "recent", name: "최신순" },
                  { value: "like", name: "좋아요순" },
                ]}
                name="order"
                value={values.order}
                onChange={handleChange}
                className="section-boards__dropdown"
              ></Input.Select>
            </div>
          </header>
          <div className="section-content">
            <BoardList
              order={values.order}
              pageSize={10}
              keyword={values.search}
              page={values.page}
            />
          </div>
        </div>
      </section>
    </>
  );
}
