import React from "react";
import { Row, Col, Button, Typography, Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import CourseCard from "./CourseCard";
import "./css/CoursesSection.css";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const CoursesSection = () => {
  const navigate = useNavigate();
  // Sample course data - in a real application, this would come from props or API
  const courses = [
    {
      id: 1,
      title: "Beginner's Guide to Design",
      price: "$50.00",
      certificates: 25,
      chapters: 13,
      reviews: 25,
      orders: 254,
      shelfAdds: 500,
      isFree: true,
    },
    {
      id: 2,
      title: "Beginner's Guide to Design",
      price: "$50.00",
      certificates: 25,
      chapters: 13,
      reviews: 25,
      orders: 254,
      shelfAdds: 500,
      isFree: true,
    },
    {
      id: 3,
      title: "Beginner's Guide to Design",
      price: "$50.00",
      certificates: 25,
      chapters: 13,
      reviews: 25,
      orders: 254,
      shelfAdds: 500,
      isFree: true,
    },
    {
      id: 4,
      title: "Beginner's Guide to Design",
      price: "$50.00",
      certificates: 25,
      chapters: 13,
      reviews: 25,
      orders: 254,
      shelfAdds: 500,
      isFree: true,
    },
  ];

  return (
    <div className="courses-container">
      <div className="courses-header">
        <Title level={4} className="courses-title">
          Courses
        </Title>
        <div className="courses-actions">
          <Link
            to="/mentor/courses/add"
            className="nav-link active"
            aria-current="page"
          >
            <Button 
              type="primary" 
              className="add-course-btn"
            >
              Add Course
            </Button>
          </Link>
          
          <EllipsisOutlined className="dots-icon" />
        </div>
      </div>

      <Row gutter={[10, 10]} className="courses-grid">
        {courses.map((course) => (
          <Col xs={24} md={8} key={course.id}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CoursesSection;
