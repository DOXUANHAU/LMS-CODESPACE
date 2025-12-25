import React from "react";
import { Card, Typography, Divider, Row, Col } from "antd";
import "./css/CategoryCard.css";

const { Title, Text } = Typography;

const StatItem = ({ value, label }) => (
  <div className="stat-item">
    <Text className="stat-value">{value}</Text>
    <Text className="stat-label">{label}</Text>
  </div>
);

const CategoryCard = ({ course }) => {
  const {
    title,
    price,
    certificates,
    chapters,
    reviews,
    orders,
    shelfAdds,
    isFree,
  } = course;

  return (
    <Card className="course-card" variant={true}>
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
    </Card>
  );
};

export default CategoryCard;
