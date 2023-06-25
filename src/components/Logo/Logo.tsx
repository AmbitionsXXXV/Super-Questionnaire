import { useState, useEffect } from "react"
import type { FC } from "react"
import { Space, Typography } from "antd"
import { CodeOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from "@/router"
import useGetUserInfo from "@/hooks/useGetUserInfo"

const { Title } = Typography

const Logo: FC = () => {
  const { username } = useGetUserInfo()

  const [pathname, setPathname] = useState(HOME_PATHNAME)
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <div className="w-200 px-0 my-3 text-center leading-none">
      <Link to={pathname}>
        <Space>
          <Title>
            <CodeOutlined className="text-white" />
          </Title>
          <Title style={{ color: "white", margin: 0, fontSize: "32px" }}>
            超级问卷
          </Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
