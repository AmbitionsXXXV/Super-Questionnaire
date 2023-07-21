import { useSelector } from "react-redux"
import { type StateType } from "@/store"
import { type PageInfoType } from "@/store/modules/pageInfo"

const useGetPageInfo = () =>
  useSelector<StateType>(state => state.pageInfo) as PageInfoType

export default useGetPageInfo
