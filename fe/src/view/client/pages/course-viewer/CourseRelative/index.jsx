import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Typography } from "antd";
import NavigationButtons from "./NavigationButtons";
import { scrollContainer } from "../../../../../utils/helper/scrollContainerHelper";
import "./css/testimonial.css";
import CourseCard from "../../../components/Courses/CourseCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import courseApi from "../../../../../api/courseApi";

const { Title } = Typography;

const CourseRelative = ({title, mentor}) => {
  const containerRef = useRef(null);
  const [coursesRelative, setCoursesRelative] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await courseApi.getCoursesByMentor(mentor.id);
      setCoursesRelative(response.data.courses || []);
    } catch (error) {
      toast.error("Không thể tải danh sách khóa học.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (direction) => {
    scrollContainer(containerRef, direction);
  };

  return (
    <section className="testimonials-section">
      <Row
        className="testimonials-header"
        justify="space-between"
        align="middle"
      >
        <Col>
          <Title
            level={2}
            style={{ margin: 0, fontSize: 24, lineHeight: "34px" }}
          >
            {title}
          </Title>
        </Col>
        <Col>
          <NavigationButtons onNavigate={handleNavigation} />
        </Col>
      </Row>

      <div className="testimonials-container" ref={containerRef}>
        <Row gutter={16} wrap={false} style={{ display: "flex", width: "1296px" }}>
          {coursesRelative.map((course) => (
            <Col key={course.id} style={{ flex: "0 0 432px" }}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default CourseRelative;
