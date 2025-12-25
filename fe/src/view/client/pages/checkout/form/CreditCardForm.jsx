// CreditCardForm.jsx
import React from "react";
import { Form, Input, Row, Col } from "antd";

const CreditCardForm = () => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          label="Name on Card"
          name="nameOnCard"
          rules={[{ required: true, message: "Please enter the name on card" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Card Number"
          name="cardNo"
          rules={[{ required: true, message: "Please enter your card number" }]}
        >
          <Input placeholder="1234 5678 9012 3456" maxLength={19} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Expiry Date"
          name="expiryDate"
          rules={[{ required: true, message: "Enter expiry (MM/YY)" }]}
        >
          <Input placeholder="MM/YY" maxLength={5} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="CVV"
          name="cvv"
          rules={[{ required: true, message: "Enter CVV" }]}
        >
          <Input placeholder="123" maxLength={4} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default CreditCardForm;
