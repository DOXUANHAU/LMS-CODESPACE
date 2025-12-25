import React from "react";
import { Typography, Divider } from "antd";

const { Text } = Typography;

const PriceBreakdown = ({ prices }) => {
  return (
    <div className="price-breakdown">
      <div className="price-row">
        <Text>Price</Text>
        <Text strong>${prices.subtotal}</Text>
      </div>
      <div className="price-row">
        <Text>Discount</Text>
        <Text strong type="danger">
          -${prices.discount}
        </Text>
      </div>
      <div className="price-row">
        <Text>Tax</Text>
        <Text strong>${prices.tax}</Text>
      </div>

      <Divider />

      <div className="price-row total">
        <Text strong>Total</Text>
        <Text strong>${prices.total}</Text>
      </div>
    </div>
  );
};

export default PriceBreakdown;
