import { type FC, useEffect } from "react"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import { Form, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import { useDispatch } from "react-redux"
import { resetPageInfo } from "@/store/modules/pageInfo"

const { TextArea } = Input

const PageSetting: FC = () => {
  const [form] = useForm()
  const pageInfo = useGetPageInfo()
  const dispatch = useDispatch()

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        name="title"
        label="问卷标题"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item name="desc" label="问卷描述">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item name="desc" label="css">
        <TextArea placeholder="请输入 CSS 样式代码..." />
      </Form.Item>
      <Form.Item name="desc" label="js">
        <TextArea placeholder="请输入 JS 脚本代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
