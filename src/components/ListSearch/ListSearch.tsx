import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import { Input } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "@/constant";

const { Search } = Input;

const ListSearch: FC = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  // 获取 url 参数
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState<string>("");

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function searchHandler(value: string) {
    navigator({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    });
  }

  // 设置 url 参数作为 Input的 value
  useEffect(() => {
    const newValue = searchParams.get(LIST_SEARCH_PARAM_KEY) ?? "";
    setValue(newValue);
  }, [searchParams]);

  return (
    <>
      <Search
        allowClear
        size="middle"
        value={value}
        placeholder="请输入关键字"
        style={{ width: "210px" }}
        onSearch={searchHandler}
        onChange={changeHandler}
      />
    </>
  );
};

export default ListSearch;
