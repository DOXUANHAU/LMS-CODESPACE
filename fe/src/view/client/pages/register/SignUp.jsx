import React from 'react';
import { Row, Col } from 'antd';
import SignupForm from './SignupForm';
import './styles.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <Row gutter={20}>
        <Col xs={24} md={12}>
          <div className="signup-image">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d34a4dfb004d424bbc850c2945fc8b22c55daa9bf2fcc326c9ee13f11d12ce9"
              alt="Signup illustration"
            />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <SignupForm />
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
