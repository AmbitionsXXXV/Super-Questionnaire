import type { FC } from "react"
import { useEffect } from "react"
import { OptionType, QuestionRadioPropsType } from "./interface"
import { Button, Checkbox, Form, Input, Select, Space } from "antd"
import { useForm } from "antd/es/form/Form"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { nanoid } from "nanoid"

const PropComponent: FC<QuestionRadioPropsType> = ({
  title,
  value,
  options = [],
  disabled,
  isVertical,
  onChange
}) => {
  const [form] = useForm()
  useEffect(() => {
    form.setFieldsValue({ title, value, isVertical, options })
  }, [title, value, isVertical, options])

  function handleValuesChange() {
    if (onChange == null) return
    const newValues = form.getFieldsValue() as QuestionRadioPropsType

    if (newValues.options) {
      // 需要清除 text undefined 的选项
      newValues.options = newValues.options.filter(opt => !(opt.text == null))
    }

    const { options = [] } = newValues
    options.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5)
    })

    onChange(newValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={disabled}
      onValuesChange={handleValuesChange}
      initialValues={{ title, value, options, isVertical }}
    >
      <Form.Item
        label={"标题"}
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项(可删除) */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前项 输入框 */}
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((option: OptionType) => {
                              if (option.text === text) num++ // 记录 text 相同的个数
                            })
                            if (num === 0) return Promise.resolve()
                            return Promise.reject(new Error("有重复选项"))
                          }
                        }
                      ]}
                    >
                      <Input placeholder="输入选项文字" />
                    </Form.Item>

                    {/* 当前选项 删除按钮 */}
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                )
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  block
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => add({ text: "", value: "" })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || "" }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
