import React from "react";
import { Typography, Row, Col, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import CourseCard from "./CourseCard";
import "./css/course-relative.css";

const { Title } = Typography;

const CourseRelative = () => {
  const courses = [
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
      title: "Beginner's Guide to Design",
      author: "Ronald Richards",
      rating: 4.5,
      ratingCount: "1200",
      details: "22 Total Hours. 155 Lectures. Beginner",
      price: "149.9",
    },
    // Additional courses would be added here in production
  ];

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <Title level={4} className="section-title">
          More Courses by{" "}
          <span className="author-highlight">Ronald Richards</span>
        </Title>

        <div className="navigation-buttons">
          <Button icon={<LeftOutlined />} className="nav-button prev" />
          <Button icon={<RightOutlined />} className="nav-button next" />
        </div>
      </div>

      <Row gutter={24} className="courses-row">
        {courses.map((course, index) => (
          <Col key={index} className="course-column">
            <CourseCard {...course} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CourseRelative;
