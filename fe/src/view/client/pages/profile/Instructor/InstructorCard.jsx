import React from "react";
import { Card, Typography, Button, Divider } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import "./css/InstructorCard.css";

const { Title, Text } = Typography;

const InstructorCard = ({ instructorImage, name, title }) => {
  return (
    <Card className="instructor-card">
      <div className="instructor-image-container">
        <img src={instructorImage} alt={name} className="instructor-image" />
      </div>
      <div className="instructor-info">
        <Title level={5} className="instructor-name">
          {name}
        </Title>
        <Text className="instructor-title">{title}</Text>
      </div>
      <Divider className="instructor-divider" />
      <Button
        type="primary"
        className="message-button"
        icon={<MessageOutlined />}
      >
        Send Message
      </Button>
    </Card>
  );
};

export default InstructorCard;
