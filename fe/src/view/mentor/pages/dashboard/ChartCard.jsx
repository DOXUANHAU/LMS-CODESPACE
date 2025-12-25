import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const ChartCard = () => {
  return (
    <Card className="chart-card">
      <Title level={4} className="chart-title">Life Time Sales</Title>
      <div className="chart-container">
        {/* Y-axis labels */}
        {[1000, 800, 600, 400, 200, 0].map((val, index) => (
          <div key={index} className="y-axis-label" style={{ top: `${27 + index * 48}px` }}>
            <Text className="axis-text">{val}.00</Text>
            <div className={`axis-line ${val === 0 ? "solid" : ""}`}></div>
          </div>
        ))}
        {/* Chart visualization */}
        <div className="chart-visualization">
          <div className="chart-blue-area" style={{ left: "87px", top: "37px" }}></div>
          <div className="chart-green-area" style={{ left: "87px", top: "85px" }}></div>
          <div className="chart-yellow-area" style={{ left: "87px", top: "229px" }}></div>
        </div>
      </div>
    </Card>
  );
};

export default ChartCard;
