import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notification, Card, Row, Col, Breadcrumb } from "antd";
import CustomLayout from "../Components/CustomLayout";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const WelcomeText = styled.h2`
  color: #1890ff;
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
`;

const StatsCard = styled(Card)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.auth);
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      notification.success({
        message: `Welcome!`,
        description: "You have successfully logged in.",
        placement: "topRight",
        duration: 2,
      });
    }
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Welcome to your personalized dashboard. Manage your notes, view statistics, and more."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Dashboard " />
        <meta
          property="og:description"
          content="Manage your notes, view statistics, and track your progress on your dashboard."
        />
        <meta property="og:image" content="your-image-url.jpg" />
      </Helmet>

      <CustomLayout user={user}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>

        <main style={{ padding: "20px" }}>
          <WelcomeText>
            Welcome to Your Dashboard, {user ? user.username : "Guest"}!
          </WelcomeText>

          <section style={{ marginTop: "20px" }}>
            {status === "loading" ? (
              <p>Loading...</p>
            ) : (
              <p>Here is your dashboard content with some useful cards.</p>
            )}
          </section>

          <Row gutter={16}>
            <Col span={8}>
              <StatsCard title="Notes Added" bordered={false}>
                <p>Total Notes: {notes.length}</p>
              </StatsCard>
            </Col>
          </Row>
        </main>
      </CustomLayout>
    </>
  );
};

export default Home;
