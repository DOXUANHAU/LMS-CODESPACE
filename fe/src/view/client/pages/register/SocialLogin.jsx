import React from "react";
import { Button, Row, Col } from "antd";

const SocialLogin = () => {
  return (
    <Row gutter={16} className="social-login-container">
      <Col xs={24} sm={8}>
        <Button className="social-btn facebook-btn" block>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/404b93fb34305b74fe074aae333315dcdb63b3a06c6e46504d4851be9d59fc46"
            alt="Facebook"
            className="social-icon"
          />
          Facebook
        </Button>
      </Col>
      <Col xs={24} sm={8}>
        <Button className="social-btn google-btn" block>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c86094a0ad6ebd8951da3529c43382570ed759c82ffbc5c4d5c0f6089c90963"
            alt="Google"
            className="social-icon"
          />
          Google
        </Button>
      </Col>
      <Col xs={24} sm={8}>
        <Button className="social-btn microsoft-btn" block>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/de5aa298d881f9edfba360b1a112b7c95f9c56bcc0d43205dbaff4a95b009746"
            alt="Microsoft"
            className="social-icon"
          />
          Microsoft
        </Button>
      </Col>
    </Row>
  );
};

export default SocialLogin;
