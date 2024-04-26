import icoSearch from "../img/ic_search.svg";

export function SearchText({ name, value, onChange, onSubmit, className }) {
  return (
    <div className={`${className}`}>
      <form onSubmit={onSubmit} className="text-search">
        <img src={icoSearch} alt="검색" className="text-search__ico"/>
        <input type="text" name={name} value={value} onChange={onChange} className="text-search__input" placeholder="검색할 상품을 입력해주세요"/>
      </form>
    </div>
    
  );
}