import { useEffect } from "react";
import type { FC } from "react";
import Checkbox from "antd/es/checkbox/Checkbox";
import { Button, Form, Input, Space, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from "@/router";
import { UserAddOutlined } from "@ant-design/icons";
import { PASSWORD_KEY, USERNAME_KEY } from "@/constant";
import { useRequest } from "ahooks";
import { loginService } from "@/service/user";
import { setToken } from "@/utils/user-token";

interface IFormItem {
  username: string;
  password: string;
  remember: boolean;
}

const { Title } = Typography;

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFromStorage(): { username: string; password: string } {
  return {
    username: localStorage.getItem(USERNAME_KEY)!,
    password: localStorage.getItem(PASSWORD_KEY)!
  };
}

const Login: FC = () => {
  const [form] = Form.useForm();
  const navigator = useNavigate();

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = "" } = result;
        setToken(token); // 存储 token

        message.success("登录成功");
        navigator(MANAGE_INDEX_PATHNAME); // 导航到“我的问卷”
      }
    }
  );

  function onFinish(values: IFormItem) {
    const { remember, username, password } = values ?? {};

    run(username, password); // 执行异步请求

    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  }

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  return (
    <div className="h-login flex flex-col justify-center items-center bg-white">
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
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
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
