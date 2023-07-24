import { type FC, useState } from "react"
import { Pagination, Spin, Table, Typography } from "antd"
import { useRequest } from "ahooks"
import { useParams } from "react-router-dom"
import { getQuestionStatListService } from "@/service/stat"
import useGetComponentInfo from "@/hooks/useGetComponentInfo"
import { STAT_PAGE_SIZE } from "@/constant"
import style from "../index.module.scss"

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const PageStat: FC<PropsType> = ({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType
}: PropsType) => {
  const { id = "" } = useParams()

  const [list, setList] = useState<any[]>([])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const { loading } = useRequest(
    async () => await getQuestionStatListService(id, { page, pageSize }),
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res
        setTotal(total)
        setList(list)
      }
    }
  )

  const { componentList } = useGetComponentInfo()
  const columns = componentList.map((c, index: number) => {
    const { fe_id, title, props = {}, type } = c

    const colTitle = props!.title || title

    return {
      fixed: index === 0 || index === 1,
      // width: "50px",
      // title: colTitle,
      title: (
        <div
          className="cursor-pointer"
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span
            className={`${fe_id === selectedComponentId ? "text-[#1890ff]" : ""}`}
          >
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id
    }
  })

  const dataSource = list.map((i: any) => ({ ...i, key: i._id }))
  const TableElem = (
    <>
      <Table
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        className={style.planTable}
        scroll={{
          // x: 100,
          y: "calc(100vh - 260px)"
        }}
      ></Table>
      <div className="text-center mt-[18px]">
        <Pagination
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )

  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div className="text-center">
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  )
}

export default PageStat
