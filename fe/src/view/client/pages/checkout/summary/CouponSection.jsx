import React from "react";
import { Space, Typography } from "antd";
import { TagOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CouponSection = () => {
  return (
    <div className="coupon-section">
      <Space>
        <TagOutlined />
        <Text strong>APPLY COUPON CODE</Text>
      </Space>
    </div>
  );
};

export default CouponSection;
