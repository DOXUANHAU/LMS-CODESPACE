import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Layout, Row, Col } from "antd";
// import Breadcrumb from "./CourseIntro/Breadcrumb";
import CourseInfo from "./CourseIntro/CourseInfo";
import CourseStats from "./CourseIntro/CourseStats";
import AddToCart from "./AddToCart/AddToCart";
import CourseDetails from "./CourseDetail/CourseDetails";
import TestimonialsSection from "./TestimonialSession/index";
import "./css/styles.css";
import CheckoutHeader from "../checkout/CheckoutHeader";
import SimilarCourses from "./SimilarCourses/SimilarCourses";
import courseApi  from "../../../../api/courseApi";
import CourseRatingForm from "./CourseRatingForm"

const CourseHeader = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const courseId = Number(id);
  const user = JSON.parse(localStorage.getItem("user"));
  const { state } = useLocation();
  const ratings = state?.ratings || [];

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const response = await courseApi.getCourseById(courseId);
        setCourse(response.data.course); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khóa học:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Đang tải khóa học...</p>;
  if (!course) return <p>Không tìm thấy khóa học.</p>;

  return (
    <Layout.Content className="course-header">
      <CheckoutHeader step={0} />
      <Row justify="center" gutter={[16, 16]}>
        <Col span={24} lg={16}>
          {/* <Breadcrumb course={course} /> */}
          <CourseInfo course={course} />
          <CourseStats course={course} />
          <CourseDetails course={course} ratings={ratings}/>
          <CourseRatingForm course={course} user={user} />
        </Col>
        <Col span={24} lg={8} className="add-to-cart-container">
          <AddToCart course={course} />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <TestimonialsSection course={course} title="Khách hàng nói gì về chúng tôi"/>
        <SimilarCourses course={course} />
      </Row>
    </Layout.Content>
  );
};

export default CourseHeader;
