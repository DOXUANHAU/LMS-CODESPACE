import React from "react";
import { Card, Avatar, Typography, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const { Title, Text } = Typography;

const InstructorCard = ({ mentor, avatar, name, role, rating, students }) => {
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate(`/instructor-info/${mentor.mentorDetail.id}`, { state: { mentor } });
  };

  return (
    <Card className="instructor-card" onClick={handleNavigate}>
      <Avatar size={100} src={avatar} />
      <Title level={4} className="instructor-name">{name}</Title>
      <Text className="instructor-role">{role}</Text>
      <Rate disabled defaultValue={rating} className="rating" />
      <Text className="students-count">{students} Students</Text>
    </Card>
  );
};

export default InstructorCard;
