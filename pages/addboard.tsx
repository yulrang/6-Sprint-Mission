"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAsync from "@/src/hooks/useAsync";
import { createItems } from "@/src/api/api";
import Input from "@/components/Input";
import Button from "@/components/Button/Button";
import Header from "@/components/Header";

const INITIAL_VALUES = {
  name: null,
  description: null,
  images: null,
};

export default function AddBoardPage({ initialValues = INITIAL_VALUES }) {
  const [isLoading, loadingError, onSubmitAsync] = useAsync(createItems);
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  const [values, setValues] = useState(initialValues);
  const router = useRouter();

  const handleChange = (name: keyof typeof INITIAL_VALUES, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof typeof INITIAL_VALUES, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name || "");
    formData.append("description", values.description || "");
    formData.append("images", values.images || "");

    if (typeof onSubmitAsync !== "function") {
      console.error("onSubmitAsync is not a function");
      return;
    }

    const result = await onSubmitAsync(formData);
    if (!result) return;

    router.push("/items");
  };

  useEffect(() => {
    setIsDisableSubmit(Object.values(values).every((el: any) => el !== "" && el !== null && el.length !== 0));
  }, [values]);

  return (
    <>
      <Header />
      <section className="section-add">
        <form onSubmit={handleSubmit}>
          <div className="section-wrap">
            <header className="section-header">
              <h2 className="section-tit">게시글 쓰기</h2>
              <Button type="submit" id="submit-article" size="small" disabled={!isDisableSubmit} className="btn-small btn-submit">
                등록
              </Button>
            </header>
            <section className="section-addItem-content">
              <h3 className="section-tit">
                <sup>
                  *<span className="blind">필수 입력사항</span>
                </sup>
                제목
              </h3>
              <Input.Text name="name" value={values.name} onChange={handleInputChange} placeholder="제목을 입력해주세요" />
            </section>
            <section className="section-addItem-content">
              <h3 className="section-tit">
                <sup>
                  *<span className="blind">필수 입력사항</span>
                </sup>
                내용
              </h3>
              <Input.Textarea name="description" value={values.description} onChange={handleInputChange} size="large" placeholder="내용을 입력해주세요" />
            </section>
            <section className="section-addItem-content">
              <h3 className="section-tit">상품 이미지</h3>
              <Input.File name="images" value={values.images} onChange={handleChange} />
            </section>
          </div>
        </form>
      </section>
    </>
  );
}
