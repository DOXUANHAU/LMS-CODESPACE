import React from "react";
import { Typography, Button } from "antd";
import { GraphIcon, HorizontalDotsIcon } from "./icons.jsx";

const { Title } = Typography;

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <Title level={3} className="dashboard-title">Dashboard</Title>
      <div className="dashboard-actions">
        <Button type="primary">Add Course</Button>
        <Button type="text" icon={<HorizontalDotsIcon />} />
      </div>
    </div>
  );
};

export default DashboardHeader;
