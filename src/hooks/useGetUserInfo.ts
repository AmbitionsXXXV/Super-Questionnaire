import { useSelector } from "react-redux";
import { UserStateType } from "../store/modules/user";
import { StateType } from "@/store";

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(
    state => state.user
  ) as UserStateType;
  return { username, nickname };
}

export default useGetUserInfo;
