import { getQuestionService } from "@/service/question"
import { resetComponents } from "@/store/modules/components"
import { useRequest } from "ahooks"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { resetPageInfo } from "@/store/modules/pageInfo"

function useLoadQuestionData() {
  const { id = "" } = useParams()
  const dispatch = useDispatch()

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有该问卷")
      return await getQuestionService(id)
    },
    { manual: true }
  )

  useEffect(() => {
    if (!data) return
    const { js = "", css = "", desc = "", title = "", componentList = [] } = data

    // 获取默认的 selectedId
    let selectedId = ""
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id // 默认选中第一个组件
    }

    // 把 componentList 存储到 redux 中
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))

    // 把 pageInfo 存储到 redux 中
    dispatch(resetPageInfo({ js, css, desc, title }))
  }, [data])

  // 请求数据
  useEffect(() => {
    run(id)
  }, [id])

  return {
    loading,
    error
  }
}

export default useLoadQuestionData
