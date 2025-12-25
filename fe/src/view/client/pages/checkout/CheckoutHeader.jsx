import React from 'react';
import { Typography, Steps } from 'antd';

const { Title } = Typography;

const CheckoutHeader = ({step}) => {
  return (
    <div className="checkout-header">
      <Title level={3}>Trang Thanh toán</Title>
      <Steps
        current={step}
        items={[
          { title: 'Chi tiết' },
          { title: 'Giỏ hàng' },
          { title: 'Thanh toán' },
        ]}
      />
    </div>
  );
};

export default CheckoutHeader;
