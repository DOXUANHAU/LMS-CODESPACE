import React from "react";
import { Row, Col, Rate, Space, Avatar, Typography, Card, Divider, Tooltip } from "antd";
import { GlobalOutlined, ClockCircleOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { baseURL } from "../../../../../api/constant";

const { Text, Title } = Typography;

const CourseStats = ({ course }) => {
  const totalLectures = course.sections?.reduce(
    (sum, section) => sum + (section.courseSectionTopics?.length || 0),
    0
  ) || 0;

  const totalMinutes = totalLectures * 10;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <Card
      style={{
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        marginTop: 24,
      }}
    >
      {/* Rating & stats */}
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 12 }}>
        <Col flex="auto">
          <Space size="middle" wrap>
            <Text strong style={{ fontSize: 24, color: "#fadb14" }}>
              4.6
            </Text>
            <Rate disabled defaultValue={4.6} />
            <Text type="secondary">(651,651 đánh giá)</Text>
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: "12px 0" }} />

      {/* Lectures & duration */}
      <Row gutter={[16, 16]}>
        <Col>
          <Space>
            <ReadOutlined style={{ fontSize: 18 }} />
            <Text strong>{totalLectures} bài giảng</Text>
          </Space>
        </Col>
        <Col>
          <Space>
            <ClockCircleOutlined style={{ fontSize: 18 }} />
            <Text strong>{hours}h {minutes > 0 ? `${minutes}m` : ""} tổng thời lượng</Text>
          </Space>
        </Col>
        <Col>
          <Space>
            <Text type="secondary">Trình độ: </Text>
            <Text strong>Dành cho mọi người</Text>
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: "12px 0" }} />

      {/* Instructor info */}
      <Row gutter={[16, 16]} align="middle">
        <Col>
          <Avatar
            size={48}
            icon={<UserOutlined />}
            src={`${baseURL}/user/${course?.mentor?.mentorDetail?.profilePic}`}
          />
        </Col>
        <Col flex="auto">
          <Text type="secondary">Giảng viên</Text>
          <br />
          <Text strong>
            {course.mentor.firstName + " " + course.mentor.lastName}
          </Text>
        </Col>
      </Row>

      <Divider style={{ margin: "12px 0" }} />

      {/* Language */}
      <Row gutter={[16, 16]} align="middle">
        <Col>
          <Space>
            <GlobalOutlined />
            <Text>English, Vietnamese</Text>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default CourseStats;
