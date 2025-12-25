import React from "react";
import { Card, Row, Col, Space, Typography } from "antd";
import { LineChartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const StatisticsCards = () => {
  // Statistics data
  const statsData = [
    {
      key: "total",
      value: "$1K",
      label: "Life Time Courses Commission",
    },
    {
      key: "received",
      value: "$800.0",
      label: "Life Time Received Commission",
    },
    {
      key: "pending",
      value: "$200.00",
      label: "Life Time Pending Commission",
    },
  ];

  return (
    <Row gutter={[24, 24]} className="stats-row">
      {statsData.map((stat) => (
        <Col xs={24} md={8} key={stat.key}>
          <Card className="stats-card">
            <Space size={16}>
              <LineChartOutlined className="stats-icon" />
              <div>
                <Title level={4} className="stats-value">
                  {stat.value}
                </Title>
                <Text className="stats-label">{stat.label}</Text>
              </div>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatisticsCards;
