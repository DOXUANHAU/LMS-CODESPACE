import React from "react";
import { Row, Col } from "antd";
import MentorHeader from "./info/MentorHeader";
import MentorDetails from "./info/MentorDetails";
import MentorSidebar from "./info/MentorSidebar";
import CourseRelative from "../course-viewer/CourseRelative";
import { useLocation } from "react-router-dom";
import "./styles.css";

function InstructorInfo() {
  const { state } = useLocation();
  const mentor = state?.mentor || {};
  const ratings = state?.ratings || [];

  console.log("Mentor Info:", mentor);
  

  if (!mentor.mentorDetail) {
    return <div>Đang tải thông tin giảng viên...</div>;
  }

  const fullName = `${mentor.lastName} ${mentor.firstName}`;

  const expertiseList = mentor.mentorDetail.expertise || [
    "Kỹ sư phần mềm",
    "Phát triển ứng dụng web",
    "Thiết kế hệ thống",
    "Tối ưu hiệu suất",
    "Công nghệ hiện đại",
  ];

  return (
    <div className="mentor-page">
      <div className="mentor-container">
        <Row gutter={20}>
          <Col xs={24} sm={24} md={19} lg={19} xl={19}>
            <div className="mentor-info-container">
              <MentorHeader
                name={fullName}
                title={mentor.mentorDetail.profession}
                students={mentor.mentorDetail.quantityStudent}
                course={mentor.mentorDetail.quantityCourse}
              />

              <MentorDetails
                about={mentor.mentorDetail.bio}
                expertise={expertiseList}
                experience={`Hơn ${mentor.mentorDetail.experience} năm kinh nghiệm`}
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={5} lg={5} xl={5}>
            <MentorSidebar
              avatar={mentor.mentorDetail.profilePic}
              degree={mentor.mentorDetail.highestQualification}
              age={mentor.mentorDetail.age}
              language={mentor.mentorDetail.languageCertificate}
              certificate={mentor.mentorDetail.selectedCertificate}
              socialLinks={["Website", "LinkedIn"]}
            />
          </Col>
        </Row>

        <div style={{ marginTop: 40 }}>
          <CourseRelative
            title={`Các khóa học khác của ${fullName}`}
            mentor={mentor}
          />
        </div>
      </div>
    </div>
  );
}

export default InstructorInfo;
