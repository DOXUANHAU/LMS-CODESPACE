import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Rate, Space, Row, Col, Tag, Progress, Button } from "antd";
import { UserOutlined, CheckCircleOutlined, StarFilled } from "@ant-design/icons";
import courseApi from "../../../../../api/courseApi";
import { baseURL } from "../../../../../api/constant";

const { Title, Text, Paragraph } = Typography;

const MyCourseCard = ({ courseBooking }) => {
  const navigate = useNavigate();
  const [courseProgress, setCourseProgress] = useState(0);

  if (!courseBooking) {
    return <p>Đang tải dữ liệu khoá học...</p>;
  }

  const handleGoToLearning = () => {
    navigate(`/my-learning/${courseBooking.course.id}/learn`, { state: { courseBooking } });
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id && courseBooking?.course?.id) {
          const response = await courseApi.getCourseProgress(user.id, courseBooking.course.id);
          setCourseProgress(response.data);
        }
      } catch (error) {
        console.error("❌ Lỗi lấy tiến độ khóa học:", error);
      }
    };
  
    fetchProgress();
  }, [courseBooking]);

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
  };

  return (
    <Card
        hoverable
        cover={
        <img 
            alt={courseBooking.course.name}
            src={`${baseURL}/course/${courseBooking.course.thumbnail}`}
            style={{ 
            height: 160,
            objectFit: "cover",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
            }}
        />
        }
        style={{
        width: '100%', // Đảm bảo Card chiếm toàn bộ chiều rộng của Col
        maxWidth: 320, // Đặt maxWidth để Card có kích thước cố định
        height: 'auto', // Chiều cao sẽ tự động điều chỉnh theo nội dung
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        overflow: "hidden"
        }}
        bodyStyle={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 16
        }}
    >
      <div style={{ flex: 1 }}>
        <Title 
          level={4} 
          ellipsis={{ rows: 2 }}
          style={{ marginBottom: 8, minHeight: 56 }}
        >
          {courseBooking.course.name}
        </Title>

        <Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
          {courseBooking.course.category?.name}
        </Text>

        <Paragraph 
          ellipsis={{ rows: 3 }}
          style={{ marginBottom: 12, color: "#666", minHeight: 72 }}
        >
          {truncateDescription(courseBooking.course.description)}
        </Paragraph>

        {/* Tag trạng thái booking */}
        <Space wrap style={{ marginBottom: 12 }}>
          {courseBooking.status === "SUCCESS" && (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Đã xác nhận
            </Tag>
          )}
          {courseBooking.status === "PENDING" && (
            <Tag color="warning">Chờ xác nhận</Tag>
          )}
          {courseBooking.status === "CANCELLED" && (
            <Tag color="red">Đã huỷ</Tag>
          )}
        </Space>

        {/* Tiến độ học */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <Progress 
            percent={courseProgress || courseBooking.progress || 0}
            size="small"
            strokeColor={{
              from: "#108ee9",
              to: "#87d068",
            }}
            style={{ flex: 1 }}
          />
          <span style={{ marginLeft: 8 }}>{courseProgress || courseBooking.progress || 0}</span>
        </div>
      </div>

      {/* Footer */}
      <div>
        <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
          <Col>
            <Space size={4}>
              <Rate
                disabled
                value={courseBooking.course.averageRating || 0}
                character={<StarFilled />}
                style={{ fontSize: 14 }}
              />
              <Text type="secondary">({courseBooking.course.ratingCount || 0})</Text>
            </Space>
          </Col>
          <Col>
            <Tag icon={<UserOutlined />} color="purple">
              {"Giảng viên: " + courseBooking.course.mentor?.lastName + " " + courseBooking.course.mentor?.firstName  || "Giảng viên"}
            </Tag>
          </Col>
        </Row>

        <Row justify="space-between" align="middle">
          {/* <Col>
            {courseBooking.course.type === "free" ? (
              <Tag color="green">MIỄN PHÍ</Tag>
            ) : (
              <Tag icon={<DollarCircleOutlined />} color="blue">
                {formatFeeToVND(courseBooking.course.fee)}
              </Tag>
            )}
          </Col> */}
          <Col>
            <Button 
              type="primary" 
              size="small"
              onClick={e => {
                e.stopPropagation(); // tránh trigger Card hover
                handleGoToLearning();
              }}
            >
              Tiếp tục học
            </Button>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

MyCourseCard.propTypes = {
  courseBooking: PropTypes.shape({
    status: PropTypes.oneOf(["SUCCESS", "PENDING", "CANCELLED"]),
    progress: PropTypes.number,
    course: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.shape({
        name: PropTypes.string
      }),
      type: PropTypes.string,
      fee: PropTypes.number,
      mentor: PropTypes.shape({
        name: PropTypes.string
      }),
      averageRating: PropTypes.number,
      ratingCount: PropTypes.number
    })
  })
};

export default MyCourseCard;
