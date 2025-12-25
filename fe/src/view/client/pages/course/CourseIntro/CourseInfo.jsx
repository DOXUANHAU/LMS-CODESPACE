import React from "react";
import { Typography, Space, Tag, Button } from "antd";
import { FireOutlined, StarFilled } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const CourseInfo = ({ course }) => {
  // Tính toán thông báo giảm giá
  const discountMessage = course.discountInPercent > 0 
    ? `Khóa học đang giảm giá cực sốc ${course.discountInPercent}% Đăng ký ngay khi có thể!` 
    : null;

  return (
    <div
      className="course-info"
      style={{
        padding: "24px",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        marginBottom: "32px",
        display: "grid", // Sử dụng Grid layout
        gridTemplateRows: "auto 1fr", // Chia thành 2 dòng
        rowGap: "16px", // Khoảng cách giữa các row
      }}
    >
      {/* Row 1: Tiêu đề */}
      <Title
        level={1}
        style={{
          fontWeight: 700,
          fontSize: "36px",
          color: "#ff6f61", // Màu nổi bật
          marginBottom: "12px",
          lineHeight: 1.3,
          textTransform: "uppercase",
          letterSpacing: "1px",
          textShadow: "2px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        {course.name}
      </Title>

      {/* Row 2: Các thông tin còn lại */}
      <div>
        <Space wrap style={{ marginBottom: "16px" }}>
          <Tag color="red">
            <FireOutlined /> Phổ biến
          </Tag>
          <Tag color="gold">
            <StarFilled /> 4.6 đánh giá
          </Tag>
        </Space>

        <Paragraph
          style={{
            fontSize: "16px",
            color: "#555",
            lineHeight: 1.75,
            whiteSpace: "pre-line",
          }}
        >
          {course.description}
        </Paragraph>

        {discountMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: "#ff6f61",
              padding: "12px 20px",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "20px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transform: "scale(1.05)",
            }}
          >
            {discountMessage}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
