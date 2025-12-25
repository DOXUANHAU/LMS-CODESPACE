import React, { useState } from "react";
import { Typography, Button } from "antd";
import AddCategoryForm from "../../../../components/AddCategory/AddCategoryForm";

const { Title } = Typography;

const DashboardHeader = ({title}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="dashboard-header">
      <Title level={3} className="dashboard-title">{title}</Title>
      <div className="dashboard-actions">
      </div>
    </div>
  );
};

export default DashboardHeader;
