import React from "react";
import { Avatar, Typography, Row, Col } from "antd";
import { StarFilled } from "@ant-design/icons";
import "./styles.css";

const { Text } = Typography;

const ReviewCard = ({ name, avatar, rating, date, content }) => {
  return (
    <div className="review-card">
      <Row className="review-header">
        <Col xs={24} md={8} className="reviewer-info">
          <Avatar src={avatar} size={60} className="reviewer-avatar" />
          <Text className="reviewer-name">{name}</Text>
        </Col>

        <Col xs={24} md={16} className="review-meta">
          <div className="review-rating-date">
            <div className="review-rating">
              <div style={{ width: "19px", height: "19px" }}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/87dbc2e02d7c0860567e4a1d82275d98cc907ac0223d19e68f75700c7054321b?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c"
                  alt="Star"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <Text className="rating-number">{rating}</Text>
            </div>
            <Text className="review-date">Reviewed on {date}</Text>
          </div>

          <Text className="review-content">{content}</Text>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewCard;
