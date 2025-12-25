import React from 'react';
import { Form, Input } from 'antd';

const PaymentMethodForm = ({ onChange }) => {
  const [form] = Form.useForm();

  const handleValuesChange = (_, allValues) => {
    onChange?.(allValues); // Gửi dữ liệu lên component cha
  };

  return (
    <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
      <Form.Item label="Tên trên thẻ" name="nameOnCard" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Số thẻ" name="cardNo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Ngày hết hạn" name="expiryDate" rules={[{ required: true }]}>
        <Input placeholder="MM/YY" />
      </Form.Item>
      <Form.Item label="CVV" name="cvv" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PaymentMethodForm;
