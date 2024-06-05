import { Button, Form, FormProps, Input, Layout, Space } from "antd";
import AppHeader from "./AppHeader";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

const Login: FC = () => {
  const navigate = useNavigate();

  const onFinish: FormProps["onFinish"] = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLogin", "true");
      navigate("/");
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Space direction="vertical" size="middle">
        <AppHeader />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Логин"
            name="username"
            rules={[
              { required: true, message: "Введите логин!" },
              {
                validator: (_, value) =>
                  value === "admin"
                    ? Promise.resolve()
                    : Promise.reject(new Error("Неверный логин!")),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: "Введите пароль!" },
              {
                validator: (_, value) =>
                  value === "admin"
                    ? Promise.resolve()
                    : Promise.reject(new Error("Неверный пароль!")),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  );
};

export default Login;
