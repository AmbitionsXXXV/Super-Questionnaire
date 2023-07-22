import type { FC } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type PropsType = {
  id: string
  children: JSX.Element
}

const SortableItem: FC<PropsType> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default SortableItem
