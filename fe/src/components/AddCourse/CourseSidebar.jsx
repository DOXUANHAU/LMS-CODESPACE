import { Card, Typography, Badge, Image, Divider, Space, Row, Col } from "antd";
import { baseURL } from "../../api/constant";
import { formatFeeToVND } from "../../utils/helper/formatFeeToVND";
import { CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CourseSidebar = ({ course }) => {
  const calculateFeeAfterDiscount = (discount, fee) => {
    return (fee - (fee * discount) / 100).toFixed(2);
  };

  const thumbnailUrl = course?.thumbnail
    ? `${baseURL}/course/${course.thumbnail}`
    : "/default-image.png";

  const sections = course?.sections || [];
  const totalTopics = sections.reduce((sum, sec) => sum + (sec.courseSectionTopics?.length || 0), 0);
  const notes = sections.reduce((sum, sec) => sum + (sec.courseSectionNotes?.length || 0), 0);
  const totalNotes = notes + totalTopics;

  return (
    <Card 
      className="course-sidebar-card"
      style={{
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "none"
      }}
      bodyStyle={{ padding: 20 }}
    >
      <Image
        width="100%"
        src={thumbnailUrl}
        alt="Course Thumbnail"
        style={{ borderRadius: 8 }}
        preview={false}
      />

      {course?.type === "Paid" && (
        <div style={{ marginTop: 20 }}>
          <Space direction="vertical" size={4} style={{ width: "100%" }}>
            <Row align="middle" gutter={8}>
              <Col>
                <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
                  {formatFeeToVND(calculateFeeAfterDiscount(course.discountInPercent, course.fee))}
                </Title>
              </Col>
              {course.discountInPercent > 0 && (
                <>
                  <Col>
                    <Text delete type="secondary">
                      {formatFeeToVND(course.fee)}
                    </Text>
                  </Col>
                  <Col>
                    <Badge 
                      count={`Giảm ${course.discountInPercent}%`} 
                      style={{ 
                        backgroundColor: "#ff4d4f",
                        color: "#fff",
                        fontWeight: 500
                      }} 
                    />
                  </Col>
                </>
              )}
            </Row>
            {course.discountInPercent > 0 && (
              <Text type="secondary" style={{ fontSize: 12 }}>
                Tiết kiệm: {formatFeeToVND((course.fee * course.discountInPercent) / 100)}
              </Text>
            )}
          </Space>
        </div>
      )}

      {course?.type === "Free" && (
        <div style={{ marginTop: 20 }}>
          <Badge 
            count="MIỄN PHÍ" 
            style={{ 
              backgroundColor: "#52c41a",
              color: "#fff",
              fontSize: 14,
              padding: "0 8px",
              borderRadius: 4
            }} 
          />
        </div>
      )}

      <Divider style={{ margin: "16px 0" }} />

      <Title level={5} style={{ marginBottom: 16 }}>Nội dung khóa học</Title>
      
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Row align="middle">
          <Col span={4}>
            <PlayCircleOutlined style={{ color: "#1890ff", fontSize: 18 }} />
          </Col>
          <Col span={20}>
            <Text>{sections.length} chương học</Text>
          </Col>
        </Row>
        
        <Row align="middle">
          <Col span={4}>
            <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 18 }} />
          </Col>
          <Col span={20}>
            <Text>{totalTopics} bài học video</Text>
          </Col>
        </Row>
        
        <Row align="middle">
          <Col span={4}>
            <FileTextOutlined style={{ color: "#faad14", fontSize: 18 }} />
          </Col>
          <Col span={20}>
            <Text>{totalNotes} Tài liệu đính kèm</Text>
          </Col>
        </Row>
      </Space>

      <Divider style={{ margin: "16px 0" }} />

      <div style={{ textAlign: "center" }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Bảo đảm hoàn tiền trong 7 ngày nếu không hài lòng
        </Text>
      </div>
    </Card>
  );
};

export default CourseSidebar;