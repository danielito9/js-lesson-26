import { Form, Input, Button } from "antd";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { register, isLoading } = useAuthStore();
 const navigate = useNavigate()
  const submit = async (values) => {
    await register(values);
    navigate("/")
  };

  return (
    <>
      <h2>Register</h2>

      <Form style={{ width: 500 }} onFinish={submit} layout="vertical">
        <Form.Item
          label="Name"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isLoading}>
          Register
        </Button>
      </Form>
    </>
  );
};
