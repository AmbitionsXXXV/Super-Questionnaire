import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY
} from "@/constant";
import { Pagination } from "antd";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type PropsType = {
  total: number;
};

const ListPagination: FC<PropsType> = ({ total }) => {
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIST_PAGE_SIZE);
  const [searchParams] = useSearchParams();

  const navigator = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());

    navigator({
      pathname,
      search: searchParams.toString() // 除了改变 page pageSize 之外，其他的 url 参数要带着
    });
  }

  // 获取 url 中的 page pageSize 参数
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE;

    setCurrent(page);
    setPageSize(pageSize);
  }, [searchParams]);

  return (
    <>
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </>
  );
};

export default ListPagination;
