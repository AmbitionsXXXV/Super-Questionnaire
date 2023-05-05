import { ComponentsInfoType } from "@/store/modules/components";

export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentsInfoType[]
) {
  const index = componentList.findIndex(c => c.fe_id === fe_id);
  if (index < 0) return "";

  //   重新计算 selectedId
  let newSelectedId = "";
  const length = componentList.length;
  if (length <= 1) {
    newSelectedId = "";
  } else {
    if (index + 1 === length) {
      // 删除最后一个,选中上一个
      newSelectedId = componentList[index - 1].fe_id;
    } else {
      // 删除的不是最后一个,删除以后,选中下一个
      newSelectedId = componentList[index + 1].fe_id;
    }
  }

  return newSelectedId;
}
