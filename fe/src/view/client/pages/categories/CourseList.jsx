import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import CourseFilters from './CourseFilters';
import CourseGrid from './CourseGrid';
import './styles.css'
import InstructorSection from './../../components/Instructor/InstructorSection';
import CourseSection from '../../components/Courses/CourseSection';
import { useLocation, useNavigate } from 'react-router-dom';
import courseApi from '../../../../api/courseApi';

const { Title } = Typography;

const Categories = () => {
  const [courseSection, setCourseSection] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseApi.getCoursesByStatus("Active", "No");
        console.log("Response", response);
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
    <Layout.Content className="course-list-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px' }}>
      <Title level={1}>Khóa học</Title>

      <div className="course-section">
        <Title level={2}>All Development Courses</Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={6}>
            <CourseFilters />
          </Col>
          <Col xs={24} lg={18}>
            <CourseGrid courses={courseSection} />
          </Col>
        </Row>
      </div>

      <InstructorSection />
      <CourseSection />
    </Layout.Content>
  );
};

export default Categories;
