import React from "react";
import { Typography, Row, Col } from "antd";
import CourseCard from "../../../components/Courses/CourseCard";
import "./../css/styles.css";

const { Title } = Typography;

const courseData = [
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
    title: "Beginner's Guide to Design",
    author: "By Ronald Richards",
    rating: 4.5,
    ratingCount: "1200",
    details: "22 Total Hours. 155 Lectures. Beginner",
    price: "149.9",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a34f39608537f5dc31029bca1997b454b231a6d01ae34ee9d4096bd65ec1eabf",
    title: "Beginner's Guide to Design",
    author: "By Ronald Richards",
    rating: 4.5,
    ratingCount: "1200",
    details: "22 Total Hours. 155 Lectures. Beginner",
    price: "149.9",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e1da593e9fbc3bd9fd8dfd49ae08127c0b99d269344e36971e75826f631175ff",
    title: "Beginner's Guide to Design",
    author: "By Ronald Richards",
    rating: 4.5,
    ratingCount: "1200",
    details: "22 Total Hours. 155 Lectures. Beginner",
    price: "149.9",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
    title: "Beginner's Guide to Design",
    author: "By Ronald Richards",
    rating: 4.5,
    ratingCount: "1200",
    details: "22 Total Hours. 155 Lectures. Beginner",
    price: "149.9",
  },
];

const SimilarCourses = () => {
  return (
    <div className="similar-courses-container">
      <div className="similar-courses-wrapper">
        <Title level={3} className="section-title">
          More Courses Like This
        </Title>

        <Row gutter={[24, 24]} className="courses-grid">
          {courseData.map((course, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <CourseCard {...course} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default SimilarCourses;
