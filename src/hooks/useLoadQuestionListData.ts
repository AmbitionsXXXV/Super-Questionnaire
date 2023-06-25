import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY
} from "@/constant"
import { getQuestionListService } from "@/service/question"
import { useRequest } from "ahooks"
import { useSearchParams } from "react-router-dom"

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1
      const pageSize =
        parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE

      return await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize
      })
    },
    {
      refreshDeps: [searchParams]
    }
  )

  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
