import { FC, useEffect } from "react"
import { QuestionParagraphPropsType } from "@/components/QuestionComponents/QuestionParagraph/interface"
import { Checkbox, Form, Input } from "antd"

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = ({
  text,
  isCenter,
  disabled,
  onChange
}) => {
  const [form] = Form.useForm()

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={disabled}
      initialValues={{ text, isCenter }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: "段落内容不能为空！！！" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
