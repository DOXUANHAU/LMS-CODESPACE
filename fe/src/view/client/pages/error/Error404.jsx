import React from "react";
import { Result, Button, Typography, Row, Col, Space } from "antd";
import {
  HomeOutlined,
  ArrowLeftOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import "./styles.css";

const { Title, Paragraph } = Typography;

export default function Error404() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="error-page-container">
      <Row justify="center" align="middle" className="error-content">
        <Col xs={24} md={20} lg={16}>
          <Result
            status="404"
            icon={<FrownOutlined className="custom-icon" />}
            title={
              <div className="error-title">
                <Title level={1}>404</Title>
                <Title level={3}>Page Not Found</Title>
              </div>
            }
            subTitle={
              <Paragraph className="error-description">
                Sorry, the page you're looking for doesn't exist or has been
                moved.
              </Paragraph>
            }
            extra={
              <Space size="middle" className="action-buttons">
                <Button
                  type="primary"
                  icon={<HomeOutlined />}
                  size="large"
                  onClick={handleGoHome}
                  className="home-button"
                >
                  Back to Home
                </Button>
                <Button
                  icon={<ArrowLeftOutlined />}
                  size="large"
                  onClick={handleGoBack}
                  className="back-button"
                >
                  Go Back
                </Button>
              </Space>
            }
          />

          <div className="error-suggestions">
            <Title level={5}>You might want to check:</Title>
            <ul className="suggestion-list">
              <li>If you typed the URL correctly</li>
              <li>If the page has been moved or renamed</li>
              <li>If you have access to this resource</li>
            </ul>
          </div>
        </Col>
      </Row>

      <div className="animated-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
    </div>
  );
}
