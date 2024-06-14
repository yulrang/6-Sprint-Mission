import { useCallback, useEffect, useState } from "react";
import Styles from "./ItemList.module.scss";
import { ItemCard } from "./ItemCard";
import { getItems } from "src/api/api";
import { useAsync } from "src/hooks/useAsync";
import { Pagination } from "./Pagination";
import { Item } from "src/types/item";

interface ItemListProps {
  order: string;
  keyword?: string;
  page?: number;
  pageSize: number;
}

export function ItemList({
  order = "",
  pageSize = 0,
  keyword = "",
  page = undefined,
}: ItemListProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [paging, setPaging] = useState<number>(1);
  const [isLoading, loadingError, getItemsAsync] = useAsync(getItems);
  const [pageTotal, setPageTotal] = useState<number>(0);

  const handleLoad = useCallback(
    async (options: ItemListProps) => {
      if (typeof getItemsAsync !== "function") {
        console.error("getItemsAsync is not a function");
        return;
      }

      let result = await getItemsAsync(options);
      if (!result) return;

      const { list, totalCount } = result;

      setPageTotal(Math.ceil(totalCount / pageSize));
      setItems(list);
    },
    [getItemsAsync]
  );

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPaging(Number(e.currentTarget.value));
    handleLoad({ order, page: paging, pageSize, keyword });
  };

  useEffect(() => {
    handleLoad({ order, page: paging, pageSize, keyword });
  }, [order, keyword, paging, pageSize, handleLoad]);
  if (page) {
    return (
      <>
        <ul className={Styles.itemLists}>
          {items.map((item) => {
            return (
              <li key={item.id} className={Styles.itemList}>
                <ItemCard item={item} />
              </li>
            );
          })}
        </ul>

        {!loadingError && items.length === 0 && (
          <div className={Styles.error}>
            <p className={Styles.errorTxt}>일치하는 결과가 없습니다.</p>
          </div>
        )}
        <Pagination
          now={paging}
          total={pageTotal}
          onClick={handleLoadMore}
          onChange={setPaging}
        />
      </>
    );
  }
  return (
    <ul className={`${Styles.itemLists} ${Styles.best}`}>
      {items.map((item) => {
        return (
          <li key={item.id} className={Styles.itemList}>
            <ItemCard item={item} />
          </li>
        );
      })}
    </ul>
  );
}
