import React from "react";
import { Card, Typography, Tag } from "antd";

const { Title, Text } = Typography;

const ReviewCard = ({ label, value, color }) => {
  return (
    <Card className="review-card">
      <div className="review-content">
        <Text className="review-label">{label}</Text>
        <div className="review-value-container">
          <Title level={4} className="review-value">{value}</Title>
          {color && <Tag className={`review-tag ${color}`}>{value / 100}</Tag>}
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
