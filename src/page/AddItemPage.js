import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAsync } from "hooks/useAsync";
import { createItems } from "api/api";
import Input from "components/Input";
import Button from "components/Button";

const INITIAL_VALUES = {
  name: null,
  description: null,
  price: null,
  tags: null,
  images: null,
};

export function AddItemPage({
  initialValues = INITIAL_VALUES,
  initialPreview,
}) {
  const [onSubmitAsync] = useAsync(createItems);
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("tags", values.tags);
    formData.append("images", values.images);

    let result = await onSubmitAsync(formData);
    if (!result) return;

    Navigate("/items");
  };

  useEffect(() => {
    setIsDisableSubmit(
      Object.values(values).every(
        (el) => el !== "" && el !== null && el.length !== 0
      )
    );
  }, [values]);

  return (
    <section className="section-addItem">
      <form onSubmit={handleSubmit}>
        <div className="section-wrap">
          <header className="section-header">
            <h2 className="section-tit">상품 등록하기</h2>
            <Button.Small
              disabled={!isDisableSubmit}
              className="btn-small btn-submit"
            >
              등록
            </Button.Small>
          </header>
          <section className="section-addItem-content">
            <h3 className="section-tit">상품 이미지</h3>
            <Input.File
              name="images"
              value={values.images}
              initialPreview={initialPreview}
              onChange={handleChange}
            />
          </section>
          <section className="section-addItem-content">
            <h3 className="section-tit">상품명</h3>
            <Input.Text
              name="name"
              value={values.name}
              onChange={handleInputChange}
              placeholder="상품명을 입력해주세요"
            />
          </section>
          <section className="section-addItem-content">
            <h3 className="section-tit">상품 소개</h3>
            <Input.Textarea
              name="description"
              value={values.description}
              onChange={handleInputChange}
              placeholder="상품 소개를 입력해주세요"
            />
          </section>
          <section className="section-addItem-content">
            <h3 className="section-tit">판매가격</h3>
            <Input.Text
              name="price"
              value={values.price}
              onChange={handleInputChange}
              placeholder="판매 가격을 입력해주세요"
            />
          </section>
          <section className="section-addItem-content">
            <h3 className="section-tit">태그</h3>
            <Input.Tag
              name="tags"
              value={values.tags}
              onChange={handleChange}
            />
          </section>
        </div>
      </form>
    </section>
  );
}
