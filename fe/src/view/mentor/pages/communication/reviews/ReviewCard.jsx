import React from "react";
import { Card, Typography, Space, Avatar, Button, Row, Col } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import StarRating from "./StarRating";

const { Text, Paragraph } = Typography;

const ReviewCard = ({ review }) => {
  const { rating, courseName, userName, timeAgo, content } = review;

  return (
    <Card className="review-card" variant={false}>
      <Row justify="space-between" align="middle" className="review-header">
        <Col>
          <Space className="rating-display">
            <Text className="rating-label">Rating:</Text>
            <StarRating rating={rating} />
          </Space>
        </Col>
        <Col>
          <Button type="text" icon={<MoreOutlined />} />
        </Col>
      </Row>

      <div className="course-info">
        <Text className="course-label">Course Name:</Text>
        <Text strong className="course-name">{courseName}</Text>
      </div>

      <Row align="middle" gutter={16} className="user-info">
        <Col>
          <Avatar size={40} className="user-avatar">{userName.charAt(0)}</Avatar>
        </Col>
        <Col className="user-details">
          <Text strong className="user-name">{userName}</Text>
          <Text type="secondary" className="time-ago">{timeAgo}</Text>
        </Col>
      </Row>

      <Paragraph className="review-content">{content}</Paragraph>
    </Card>
  );
};

export default ReviewCard;
