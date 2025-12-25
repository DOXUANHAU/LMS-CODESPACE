import React, { useState } from 'react';
import { Layout, Row, Col, Card } from 'antd';
import CheckoutHeader from './CheckoutHeader';
import AddressForm from './form/AddressForm';
import PaymentMethodForm from './form/PaymentMethodForm';
import OrderSummary from './summary/OrderSummary';
import './styles.css';
import CreditCardForm from './form/CreditCardForm';

const Checkout = () => {
  const [formValues, setFormValues] = useState({});

  const handleFormChange = (newValues) => {
    setFormValues((prev) => ({ ...prev, ...newValues }));
  };

  return (
    <Layout.Content className="checkout-container">
      <CheckoutHeader step={2} />
      <Row gutter={24} className="checkout-content">
        <Col xs={24} lg={16}>
          <Card className="checkout-form-card">
            <AddressForm onChange={handleFormChange} />
            {/* <CreditCardForm onChange={handleFormChange} /> */}
            {/* <PaymentMethodForm onChange={handleFormChange} /> */}
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <OrderSummary formValues={formValues} />
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Checkout;
