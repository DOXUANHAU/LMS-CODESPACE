import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Button } from "antd";
import CourseCard from "../../components/Courses/CourseCard";
import courseApi from "../../../../api/courseApi";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const CourseSection = () => {
  const [courseSection, setCourseSection] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseApi.getCoursesByStatus("Active", "No");
        setCourseSection(response.data.courseDTOs);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="featured-courses" style={{ marginTop: 60 }}>
      <div className="section-header">
        <Title level={2}>Khóa học</Title>
        <Button type="link">See All</Button>
      </div>
      
      {Array.isArray(courseSection) && courseSection.length > 0 ? (
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {courseSection.map((course) => (
            <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No courses found.</p>
      )}
    </section>
  );
};

export default CourseSection;

