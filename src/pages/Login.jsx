import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button, Form, Input } from "antd";

export const Login = () => {
  const { login, isLoading, error, isAuth } = useAuthStore();
  const navigate = useNavigate();

  const submit = async (value) => {
    await login(value);
    if (isAuth) navigate("/");
  };

  return (
    <>
      <Form style={{ width: 600 }} onFinish={submit}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "pleas required your email" },
            { type: "email", message: "The Email is not valid" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Pleas required your password" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>

        {error && <p>{error}</p>}
      </Form>
    </>
  );
};
