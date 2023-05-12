import { FC, useEffect } from "react";
import { QuestionInputPropsType } from "./interface";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

const PropComponent: FC<QuestionInputPropsType> = ({
  title,
  disabled,
  placeholder,
  onChange
}: QuestionInputPropsType) => {
  const [form] = useForm();

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  // 同类组件切换,切换属性值
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={disabled}
      onValuesChange={handleValueChange}
      initialValues={{ title, placeholder }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
