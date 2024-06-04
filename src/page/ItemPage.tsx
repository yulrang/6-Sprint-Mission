import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useResponsive } from "hooks/useResponsive";
import { ItemList } from "components/ItemList";
import Input from "components/Input";
import "./ItemPage.scss";

export function ItemPage() {
  const [isPC, isTablet, isMobile] = useResponsive();
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword") || "";

  const [values, setValues] = useState({
    search: initKeyword,
    order: "recent",
    page: 1,
  });

  const handlePop = (e: React.MouseEvent<HTMLButtonElement>) => {
    let { name, value } = e.currentTarget;

    handleChange(name, value);
  };

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
    setSearchParams(values.search ? { keyword: values.search } : {});
  };

  return (
    <>
      <section className="section-items best">
        <div className="section-wrap">
          <header className="section-header">
            <h2 className="section-tit">베스트 상품</h2>
          </header>
          <div className="section-content">
            {isPC && <ItemList order="favorite" pageSize={4} />}
            {isTablet && <ItemList order="favorite" pageSize={2} />}
            {isMobile && <ItemList order="favorite" pageSize={1} />}
          </div>
        </div>
      </section>
      <section className="section-items">
        <div className="section-wrap">
          <header className="section-header">
            <h2 className="section-tit">전체 상품</h2>
            <Input.Search
              name="search"
              value={values.search}
              onSubmit={handleSearch}
              onChange={handleInputChange}
              className="section-item__search"
            />
            <Link to="/additem" className="section-item__btn">
              상품 등록하기
            </Link>
            <Input.Select
              selectOptions={[
                { value: "recent", name: "최신순" },
                { value: "favorite", name: "좋아요순" },
              ]}
              name="order"
              value={values.order}
              onChange={handleChange}
              className="section-item__dropdown"
            ></Input.Select>
          </header>
          <div className="section-content">
            {isPC && (
              <ItemList
                order={values.order}
                pageSize={10}
                keyword={values.search}
                page={values.page}
              />
            )}
            {isTablet && (
              <ItemList
                order={values.order}
                pageSize={6}
                keyword={values.search}
                page={values.page}
              />
            )}
            {isMobile && (
              <ItemList
                order={values.order}
                pageSize={4}
                keyword={values.search}
                page={values.page}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
