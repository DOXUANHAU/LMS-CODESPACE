import React from "react";
import { Card, Typography } from "antd";
import { GraphIcon, HorizontalDotsIcon } from "./icons.jsx";

const { Title, Text } = Typography;

const StatsCard = ({ value, label }) => {
  return (
    <Card className="stat-card">
      <div className="stat-content">
        <div className="stat-icon">
          <GraphIcon color="#16A34A" />
        </div>
        <div className="stat-info">
          <Title level={4} className="stat-value">{value}</Title>
          <Text className="stat-label">{label}</Text>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
