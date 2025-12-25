import React from "react";
import { Typography, Row, Col, Button, Avatar, Rate, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { formatFeeToVND } from "../../../../utils/helper/formatFeeToVND";
import { baseURL } from "../../../../api/constant";

const { Title, Text } = Typography;

const CourseDetails = ({ course }) => {
  const { name, description, mentor, averageRating, fee, type, thumbnail, sections } = course;

  return (
    <div className="course-details" style={{ padding: "24px", background: "#fff", borderRadius: 8 }}>
      {/* Course Thumbnail */}
      <Row gutter={24}>
        <Col span={8}>
          <img
            src={`${baseURL}/course/${thumbnail}`}
            alt="Course Thumbnail"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Col>

        {/* Course Information */}
        <Col span={16}>
          <Title level={2}>{name}</Title>
          <Text style={{ fontSize: 16, color: "#555" }}>{description}</Text>

          {/* Rating */}
          <div style={{ marginTop: 16 }}>
            <Rate disabled defaultValue={averageRating} />
            <Text style={{ marginLeft: 8, fontSize: 16 }}>({averageRating} điểm đánh giá)</Text>
          </div>

          {/* Instructor Info */}
          <Row style={{ marginTop: 16 }} gutter={16} align="middle">
            <Col>
              <Avatar size={64} src={`${baseURL}/user/${course.mentor.mentorDetail.profilePic}`} />
            </Col>
            <Col>
              <Text style={{ fontSize: 14, color: "#888" }}>Giảng viên: </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{mentor.firstName} {mentor.lastName}</Text>
            </Col>
          </Row>

          {/* Course Type and Fee */}
          <Row style={{ marginTop: 16 }} gutter={16}>
            <Col>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Học phí: </Text>
              <Text style={{ fontSize: 16, color: fee === 0 ? "#4caf50" : "#ff5722" }}>
                {fee === 0 ? "Miễn phí" : formatFeeToVND(fee)}
              </Text>
            </Col>
            <Col>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Loại khóa học: </Text>
              <Text style={{ fontSize: 16 }}>{type}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetails;
