import React, { useState } from "react";
import { Card, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";  // Dùng useNavigate thay vì Navigate

const { Title, Text } = Typography;

const StatItem = ({ value, label }) => (
  <div className="stat-item">
    <Text className="stat-value">{value}</Text>
    <Text className="stat-label">{label}</Text>
  </div>
);

const CourseCard = ({ course }) => {
  const { id, title, price, certificates, chapters, reviews, orders, shelfAdds, isFree } = course;
  const navigate = useNavigate();  // Sử dụng useNavigate hook

  const handleNavigate = () => {
    // Dùng navigate để điều hướng
    navigate(`/mentor/courses/commission/${id}`);
  };

  return (
    <Card className="course-card" variant="outlined">
      {isFree && <div className="free-label">Free</div>}

      <Title level={5} className="course-title">
        {title}
      </Title>

      <Divider className="course-divider" />

      <div className="stats-container">
        <div className="stats-column">
          <StatItem value={price} label="Price" />
          <StatItem value={certificates} label="Certificates" />
        </div>

        <div className="stats-column">
          <StatItem value={chapters} label="Chapters" />
          <StatItem value={reviews} label="Reviews" />
        </div>

        <div className="stats-column">
          <StatItem value={orders} label="Orders" />
          <StatItem value={shelfAdds} label="Added to Shelf" />
        </div>
      </div>

      <button onClick={handleNavigate}>Go to Commission</button>
    </Card>
  );
};

export default CourseCard;
