import { type FC, useMemo, useRef } from "react"
import {
  Button,
  Input,
  InputRef,
  message,
  Popover,
  Space,
  Tooltip,
  Typography
} from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import QRCode from "qrcode.react"

const { Title } = Typography

const StatHeader: FC = () => {
  const { id } = useParams()
  const { title, isPublished } = useGetPageInfo()
  const navigate = useNavigate()

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select() // 选中 input 的内容
    document.execCommand("copy") // 拷贝选中内容 （富文本编辑器的操作）
    message.success("拷贝成功")
  }

  // function genLinkAndQRCodeElem() {
  //   if (!isPublished) return null
  //
  //   // 拼接 url ，需要参考 C 端的规则
  //   const url = `http://localhost:3000/question/${id}`
  //
  //   // 定义二维码组件
  //   const QRCodeElem = (
  //     <div style={{ textAlign: "center" }}>
  //       <QRCode value={url} size={150} />
  //     </div>
  //   )
  //
  //   return (
  //     <Space>
  //       <Input value={url} style={{ width: "300px" }} ref={urlInputRef} />
  //       <Tooltip title="拷贝链接">
  //         <Button icon={<CopyOutlined />} onClick={copy}></Button>
  //       </Tooltip>
  //       <Popover content={QRCodeElem}>
  //         <Button icon={<QrcodeOutlined />}></Button>
  //       </Popover>
  //     </Space>
  //   )
  // }

  // 使用 useMemo 1. 依赖项是否经常变化; 2. 缓存的元素是否创建成本较高
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null

    // 拼接 url ，需要参考 C 端的规则
    const url = `http://localhost:3000/question/${id}`

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: "300px" }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }, [id, isPublished])

  return (
    <div className="bg-white border-0 border-b border-solid border-[#e8e8e8] py-3 px-0 sticky top-0 z-50">
      <div className="flex mx-6 my-0">
        <div className="flex-1">
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title className="text-lg m-0 leading-none">{title}</Title>
          </Space>
        </div>
        <div className="flex-1 text-center">{LinkAndQRCodeElem}</div>
        <div className="flex-1 text-right">
          <Button type="primary" onClick={() => navigate(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
