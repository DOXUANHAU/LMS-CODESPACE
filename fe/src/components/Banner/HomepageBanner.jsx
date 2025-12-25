import React from "react";
import { Layout, Row, Col } from "antd";
import BannerContent from "./BannerContent";
import BannerImages from "./BannerImages";
import './styles.css';

const { Content } = Layout;

const HomepageBanner = () => (
  <Content className="homepage-banner">
    <Row gutter={[40, 40]} align="middle">
      <Col xs={24} md={12}>
        <BannerContent />
      </Col>
      <Col xs={24} md={12}>
        <BannerImages />
      </Col>
    </Row>
  </Content>
);

export default HomepageBanner;
