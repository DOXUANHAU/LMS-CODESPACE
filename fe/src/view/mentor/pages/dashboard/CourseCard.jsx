import React from "react";
import { Card, Tag, Typography, Divider } from "antd";

const { Title, Text } = Typography;

const CourseCard = ({ title, price, certificates, chapters, reviews, orders, shelf }) => {
  return (
    <Card className="course-card">
      <Tag className="course-tag">Free</Tag>
      <div className="course-content">
        <Title level={4} className="course-title">{title}</Title>
        <Divider className="course-divider" />
        <div className="course-stats">
          {[["Price", price], ["Certificates", certificates], ["Chapters", chapters], ["Reviews", reviews], ["Orders", orders], ["Added to Shelf", shelf]].map(([label, value], index) => (
            <div key={index} className="stat-item">
              <Title level={4} className="stat-item-value">${value}</Title>
              <Text className="stat-item-label">{label}</Text>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
