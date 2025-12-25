import React from "react";
import { Avatar, Row, Col, Space } from "antd";
import { StarFilled, UserOutlined, BookOutlined } from "@ant-design/icons";
import {
  InstructorSection,
  InstructorName,
  InstructorTitle,
  StatItem,
  InstructorBio,
  StatsWrapper,
} from "../js/styles";
import { baseURL } from "../../../../../api/constant";

const CourseInstructor = ({course, ratings}) => {
  console.log("CourseInstructor", course);
  const mentorData = course?.mentor || null;
  return (
    <InstructorSection>
      <InstructorName>{mentorData.firstName + " " + mentorData.lastName}</InstructorName>
      <InstructorTitle>{mentorData.mentorDetail.profession}</InstructorTitle>

      <Row gutter={[16, 16]} align="middle">
        <Col>
          <Avatar
            size={120}
            src={`${baseURL}/user/${mentorData.mentorDetail.profilePic}`}
          />
        </Col>
        <Col>
          <StatsWrapper>
            <StatItem>
              <StarFilled />
              <span>{ratings.length} Đánh giá</span>
            </StatItem>
            <StatItem>
              <UserOutlined />
              <span>{course.quantityStudent} Học viên</span>
            </StatItem>
            <StatItem>
              <BookOutlined />
              <span>{course.mentor.mentorDetail.quantityCourse} Khóa học</span>
            </StatItem>
          </StatsWrapper>
        </Col>
      </Row>

      <InstructorBio>
        {mentorData.mentorDetail.bio}
      </InstructorBio>
    </InstructorSection>
  );
};

export default CourseInstructor;