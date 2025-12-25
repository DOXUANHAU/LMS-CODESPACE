import React from "react";
import { Row, Col, Pagination } from "antd";
import CourseCard from "../../components/Courses/CourseCard";

const CourseGrid = ({ courses }) => {
  console.log("Courses in CourseGrid:", courses);
  return (
    <div className="course-grid">
      <Row gutter={[24, 24]}>
        {courses.map((course) => (
          <Col xs={24} sm={12} lg={8} key={course.id}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};

export default CourseGrid;
