import React from "react";
import { Card, Typography, Avatar } from "antd";
import PropTypes from "prop-types";
import "./../css/testimonial.css";

const { Text } = Typography;

const TestimonialCard = ({
  quote,
  authorName,
  authorRole,
  authorImage,
  quoteImage,
}) => (
  <Card className="testimonial-card">
    <img src={quoteImage} alt="Quote icon" className="quote-icon" />
    <Text style={{ fontSize: 16, lineHeight: "26px" }}>{quote}</Text>
    <div className="author-info">
      <Avatar src={authorImage} size={60} alt={authorName} />
      <div className="author-details">
        <Text strong style={{ fontSize: 18, display: "block" }}>
          {authorName}
        </Text>
        <Text type="secondary" style={{ fontSize: 14 }}>
          {authorRole}
        </Text>
      </div>
    </div>
  </Card>
);

TestimonialCard.propTypes = {
  quote: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorRole: PropTypes.string.isRequired,
  authorImage: PropTypes.string.isRequired,
  quoteImage: PropTypes.string.isRequired,
};

export default TestimonialCard;
