import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Button, message } from "antd";
import InstructorCard from "../../components/Instructor/InstructorCard";
import "./styles.css";
import userApi from "../../../../api/userApi";
import { baseURL } from "../../../../api/constant";

const { Title } = Typography;

const InstructorSection = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const data = await userApi.getAllMentors();
        setMentors(data); // hoặc data.mentors nếu backend trả kiểu { mentors: [...] }
      } catch (error) {
        message.error("Không thể tải danh sách giảng viên.");
        console.error(error);
      }
    };

    fetchMentors();
  }, []);
  

  return (
    <section className="instructor-section">
      <div className="section-header">
        <Title level={2}>Giảng Viên</Title>
        <Button type="link">Xem tất cả</Button>
      </div>

      <Row gutter={[24, 24]}>
        {mentors.map((mentor, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={mentor.id || index}>
            <InstructorCard
              mentor={mentor}
              avatar={`${baseURL}/user/${mentor.mentorDetail.profilePic}`}
              name={`${mentor.firstName} ${mentor.lastName}`}
              role={mentor.mentorDetail?.profession || "Mentor"}
              rating={4.8} // giả định hoặc sửa theo dữ liệu thật nếu có
              students={mentor.mentorDetail?.quantityCourse * 100 || 0} // ví dụ minh họa
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default InstructorSection;
