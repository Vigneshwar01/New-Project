import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled.div`
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
    background-color: #52c41a;
    color: white;
  }

  .ant-card-head-title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
`;

const SignUpButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const BackButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Registration successful!');
      navigate('/');
    }, 1000); 
    localStorage.setItem('user', JSON.stringify({ email, password }));
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <SignUpContainer>
      <StyledCard title="Sign Up" bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit} 
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <SignUpButton type="primary" htmlType="submit" loading={loading}>
            {loading ? <Spin /> : 'Register'}
          </SignUpButton>
          <BackButton type="default" onClick={handleBack}>
            Back
          </BackButton>
        </Form>
      </StyledCard>
    </SignUpContainer>
  );
};

export default SignUp;
