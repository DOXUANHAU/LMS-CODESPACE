import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import './styles.css';

const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <Layout.Footer className="footer">
      <div className="footer-container">
        <Row gutter={[64, 32]}>
          <Col xs={24} md={8}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b82015111f5e36f3a64f3acceb061a8a949133277d046cb124919f359b020c6"
              alt="Logo"
              className="footer-logo"
            />
            <Text className="footer-description">
              Empowering learners through accessible and engaging online
              education. <br />
              Byway is a leading online learning platform dedicated to providing
              high-quality, flexible, and affordable educational experiences.
            </Text>
          </Col>

          <Col xs={24} sm={12} md={4}>
            <Title level={4}>Get Help</Title>
            <Space direction="vertical">
              <Link>Contact Us</Link>
              <Link>Latest Articles</Link>
              <Link>FAQ</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={4}>
            <Title level={4}>Programs</Title>
            <Space direction="vertical">
              <Link>Art & Design</Link>
              <Link>Business</Link>
              <Link>IT & Software</Link>
              <Link>Languages</Link>
              <Link>Programming</Link>
            </Space>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>Contact Us</Title>
            <Space direction="vertical">
              <Text>Address: 123 Main Street, Anytown, CA 12345</Text>
              <Text>Tel: +(84) 48 188 712</Text>
              <Text>Mail: 21130338@st.hcmuaf.edu.vn</Text>
            </Space>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cff7af8338eb559aba04bb235c3a8be5d06ded865366cc152de8cd7463a9a443"
              alt="Social Media"
              className="social-media"
            />
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
