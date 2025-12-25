import React from "react";
import { Row, Col, Typography } from "antd";

const { Text, Title } = Typography;

const CourseItem = ({ course }) => {
  return (
    <Row gutter={16} align="middle">
      <Col span={8}>
        <img src={course.image} alt={course.title} className="course-image" />
      </Col>
      <Col span={16}>
        <Text type="secondary">{course.category}</Text>
        <Title level={5}>{course.title}</Title>
        <Text className="course-meta">{course.meta}</Text>
        <Text strong className="course-price">
          ${course.price}
        </Text>
      </Col>
    </Row>
  );
};

export default CourseItem;
