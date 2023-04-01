import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "@/components/ListSearch/ListSearch";
import { useSearchParams } from "react-router-dom";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "@/constant";
import { getQuestionListService } from "@/service/question";

const { Title } = Typography;

const List: FC = () => {
  useTitle("超级问卷 - 我的问卷");
  const [started, setStarted] = useState(false); // 是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState<number>(1); // List 内部的数据，不在 url 参数中体现
  const [list, setList] = useState<any[]>([]); // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState<number>(0);
  const [searchParams] = useSearchParams(); // url 参数，虽然没有 page pageSize ，但有 keyword

  const haveMoreData = total > list.length; // 有没有更多的、为加载完成的数据
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l)); // 累计
        setTotal(total);
        setPage(page + 1);
      }
    }
  );

  // 尝试去触发加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load(); // 真正加载数据
        setStarted(true);
      }
    },
    {
      wait: 1000
    }
  );

  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 1. 当页面加载，或者 url 参数（keyword）变化时，触发加载
  useEffect(() => {
    tryLoadMore(); // 加载第一页，初始化
  }, [searchParams]);

  // 2. 当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore); // 防抖
    }

    return () => {
      window.removeEventListener("scroll", tryLoadMore); // 解绑事件，重要！！！
    };
  }, [searchParams, haveMoreData]);

  // LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  }, [started, loading, haveMoreData]);

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <Title level={2}>我的问卷</Title>
        </div>
        <div className="flex-1 text-right">
          <ListSearch />
        </div>
      </div>

      <div className="mb-5">
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>

      <div className="text-center">
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};
export default List;
