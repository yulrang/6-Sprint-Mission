"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postItem, uploadImg } from "@/src/api/api";
import Input from "@/components/Input";
import Button from "@/components/Button/Button";
import Header from "@/components/Header";

interface InitialValues {
  name: string;
  description: string;
  price: string;
  tags: string[];
  images: string;
}

const INITIAL_VALUES: InitialValues = {
  name: "",
  description: "",
  price: "",
  tags: [],
  images: "",
};

export default function AddItemPage({ initialValues = INITIAL_VALUES }) {
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  const [values, setValues] = useState(initialValues);
  const router = useRouter();

  const handleChange = (name: string, value: keyof typeof INITIAL_VALUES) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value as keyof typeof INITIAL_VALUES);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    // @ts-expect-error
    formData.append("tags", values.tags);

    if (values.images) {
      const imgForm = new FormData();
      imgForm.append("image", values.images);

      const response = await uploadImg(imgForm);
      if (!response) return;
      formData.append("images", response);
    }

    const jsonObject: { [key: string]: unknown } = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    const response = await postItem(jsonObject);
    if (!response) return;

    router.push(`/items/${response.id}`);
  };

  useEffect(() => {
    setIsDisableSubmit(Object.values(values).every((el: unknown) => el !== "" && el !== null && el.length !== 0));
  }, [values]);

  return (
    <>
      <Header />
      <section className="section-add">
        <form onSubmit={handleSubmit}>
          <div className="section-wrap">
            <header className="section-header">
              <h2 className="section-tit">상품 등록하기</h2>
              <Button type="submit" id="submit-product" size="small" disabled={!isDisableSubmit} className="btn-small btn-submit">
                등록
              </Button>
            </header>
            <section className="section-addItem-content">
              <h3 className="section-tit">상품 이미지</h3>
              <Input.File name="images" value={values.images} onChange={handleChange} />
            </section>
            <section className="section-addItem-content">
              <h3 className="section-tit">상품명</h3>
              <Input.Text name="name" value={values.name} onChange={handleInputChange} placeholder="상품명을 입력해주세요" />
            </section>
            <section className="section-addItem-content">
              <h3 className="section-tit">상품 소개</h3>
              <Input.Textarea name="description" value={values.description} onChange={handleInputChange} placeholder="상품 소개를 입력해주세요" />
            </section>
            <section className="section-addItem-content">
              <h3 className="section-tit">판매가격</h3>
              <Input.Text name="price" value={values.price} onChange={handleInputChange} placeholder="판매 가격을 입력해주세요" />
            </section>
            <section className="section-addItem-content">
              <h3 className="section-tit">태그</h3>
              <Input.Tag name="tags" value={values.tags} onChange={handleChange} />
            </section>
          </div>
        </form>
      </section>
    </>
  );
}
