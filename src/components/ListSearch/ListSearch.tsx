import { useState } from "react";
import type { FC, ChangeEvent } from "react";
import { Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Search } = Input;

const ListSearch: FC = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState<string>("");

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function searchHandler(value: string) {
    navigator({
      pathname,
      search: `keyword=${value}`
    });
  }

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
