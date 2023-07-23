import { MANAGE_INDEX_PATHNAME } from "@/router"
import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import type { FC } from "react"

const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      title="404"
      status="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
