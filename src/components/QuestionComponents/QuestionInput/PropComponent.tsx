import { FC, useEffect } from "react";
import { QuestionInputPropsType } from "./interface";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

const PropComponent: FC<QuestionInputPropsType> = ({
  title,
  placeholder
}: QuestionInputPropsType) => {
  const [form] = useForm();

  // 同类组件切换,切换属性值
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  return (
    <Form layout="vertical" initialValues={{ title, placeholder }}>
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
