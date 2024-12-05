import React, { useState } from "react";
import { Form, Input, Button, Card, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../Redux/authslice";

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7fc;
  padding: 0 20px;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .ant-card-head {
    background-color: #1890ff;
    color: white;
  }

  .ant-card-head-title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
`;

const SignInButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const RegisterButton = styled(Button)`
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(
      login({
        username: credentials.email,
        password: credentials.password,
      })
    );
  };

  const goToRegisterPage = () => {
    navigate("/signup");
  };

  const loading = status === "loading";

  if (status === "succeeded") {
    message.success("Login successful!");
    navigate("/home");
  }

  if (status === "failed") {
    message.error(error || "Login failed");
  }

  return (
    <SignInContainer>
      <StyledCard title="Sign In" bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Enter your email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </Form.Item>
          <SignInButton type="primary" htmlType="submit" loading={loading}>
            {loading ? <Spin /> : "Login"}
          </SignInButton>
        </Form>
        <RegisterButton type="link" onClick={goToRegisterPage}>
          Don't have an account? Register
        </RegisterButton>
      </StyledCard>
    </SignInContainer>
  );
};

export default SignIn;
