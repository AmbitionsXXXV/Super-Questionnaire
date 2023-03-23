import {} from "react";
import type { FC } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography } from "antd";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "@/router";

const { Title } = Typography;

interface IFormItem {
  username: string;
  password: string;
  confirm: string;
  nickname: string;
}

const Register: FC = () => {
  function onFinish(values: IFormItem) {
    console.log("values:", values);
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册一个新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              { type: "string", min: 5, max: 20, message: "字符长度在 5-20 之间" },
              { pattern: /^\w+$/, message: "只能是字母数字下划线" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={["password"]} // 依赖于 password ，password 变化，会重新触发 validator
            rules={[
              { required: true, message: "请再次输入密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("两次密码不一致"));
                  }
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                立即注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户,登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
