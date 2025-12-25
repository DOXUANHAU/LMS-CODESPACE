import React from "react";
import { Form, Radio, Card, Space, Typography } from "antd";
import { CreditCardOutlined, PayCircleOutlined } from "@ant-design/icons";
import CreditCardForm from "./CreditCardForm";
// import PayPalForm from "./PayPalForm";

const { Title } = Typography;

const PaymentMethodForm = () => {
  const [paymentMethod, setPaymentMethod] = React.useState("credit");

  return (
    <>
      <Title level={5} className="payment-title">
        Payment Method
      </Title>
      <Form.Item name="paymentMethod">
        <Radio.Group
          className="payment-methods"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Space direction="vertical" className="payment-options">
            <Card className="payment-option-card">
              <Radio value="credit">
                <Space>
                  <CreditCardOutlined />
                  <span>Credit/Debit Card</span>
                </Space>
              </Radio>
              {paymentMethod === "credit" && <CreditCardForm />}
            </Card>

            <Card className="payment-option-card">
              <Radio value="paypal">
                <Space>
                  <PayCircleOutlined />
                  <span>PayPal</span>
                </Space>
              </Radio>
              {/* {paymentMethod === "paypal" && <PayPalForm />} */}
            </Card>
          </Space>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default PaymentMethodForm;
