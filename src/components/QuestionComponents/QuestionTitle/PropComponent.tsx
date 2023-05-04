import { FC, useEffect } from "react";
import { QuestionTitlePropsType } from "./interface";
import { Checkbox, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";

const PropComponent: FC<QuestionTitlePropsType> = ({
  text,
  level,
  isCenter
}: QuestionTitlePropsType) => {
  const [form] = useForm();

  // 同类组件切换,切换属性值
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);

  return (
    <Form layout="vertical" initialValues={{ text, level, isCenter }}>
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: "请输入标题内容" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 }
          ]}
        />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
