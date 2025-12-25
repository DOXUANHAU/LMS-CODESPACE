import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Typography, Space, Divider, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./../css/addToCart.css";
import courseApi from "../../../../../api/courseApi";
import { formatFeeToVND } from "../../../../../utils/helper/formatFeeToVND";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from "../../../../../api/constant";

const { Text, Title } = Typography;

const AddToCart = ({ course }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!course || !user) return null;

  const { id, name, thumbnail, fee, discountInPercent } = course;

  const originalPrice = fee;
  const currentPrice = fee === 0 ? 0 : Math.round(fee - (fee * discountInPercent) / 100);
  const isFree = fee === 0;
  const thumbnailUrl = `${baseURL}/course/${thumbnail}`;
  
  // Kiểm tra nếu ID người dùng trùng với ID của mentor
  const isOwner = user.id === course?.mentor?.id;

  const handleAddToCart = () => {
    if (isOwner) {
      toast.error("Bạn không thể thêm khóa học của chính bạn vào giỏ hàng.");
      return;  // Nếu là chủ khóa học, không cho thêm vào giỏ hàng
    }
    if (isFree) {
      message.info("Khoá học này miễn phí!");
      return;
    }
  
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const courseAlreadyAdded = existingCart.some((item) => item.id === id);
  
    if (!courseAlreadyAdded) {
      const sessions = course.sections || []; // đổi từ sessions thành sections theo data bạn gửi
      const allTopics = sessions.flatMap((section) => section.courseSectionTopics || []);
      const totalLectures = allTopics.length;
      const totalDuration = totalLectures * 10;
  
      const newCartItem = {
        id: course.id,
        title: course.name,
        thumbnail: `${baseURL}/course/${course.thumbnail}`,
        price: currentPrice,
        originalPrice: originalPrice,
        discountInPercent: course.discountInPercent,
        mentorName: `${course.mentor?.lastName || ""} ${course.mentor?.firstName || ""}`.trim(),
        lectures: `${totalLectures} bài học`,
        duration: `${totalDuration} phút`,
        level: "Tất cả trình độ", // Có thể lấy từ course.level nếu có
        description: course.description,
      };
  
      const updatedCart = [...existingCart, newCartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("storage"));
  
      toast.success("Đã thêm vào giỏ hàng!");
    } else {
      toast.warning("Khoá học đã có trong giỏ hàng.");
    }
  };
  

  const handleBuyNow = async () => {
    const customerId = user.id;
    if (isOwner) {
      toast.error("Bạn không thể đăng ký khóa học của chính bạn");
      return;  // Nếu là chủ khóa học, không cho thêm vào giỏ hàng
    }
    if (isFree) {
      try {
        const response = await courseApi.bookingCourseFree(id, customerId);
        console.log("Đăng ký khoá học miễn phí:", response.data);
        if (response.data?.success) {
          toast.success("Đã đăng ký khoá học miễn phí!");
          // navigate(`/course/${id}/learn`);
        } else {
          toast.warning(response.data?.responseMessage || "Đăng ký không thành công.");
        }
      } catch (error) {
        console.error("Lỗi khi đăng ký khoá học miễn phí:", error);
        message.error("Đăng ký khoá học thất bại!");
      }
      return;
    }

    localStorage.setItem("buyNow", JSON.stringify(course));
    navigate("/check-out");
  };

  return (
    <Card
      className="product-card"
      style={{
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        overflow: "hidden",
        padding: 0,
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={thumbnailUrl}
          alt={name}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
        />
        {discountInPercent > 0 && (
          <Tag
            color="red"
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              fontWeight: "bold",
              fontSize: 14,
              animation: "pulse 1.5s infinite",
            }}
          >
            -{discountInPercent}%
          </Tag>
        )}
      </div>

      <div style={{ padding: 16 }}>
      <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
        <span style={{ color: "#fa8c16", fontWeight: 600 }}>📘 Khóa học:</span>{" "}
        <span style={{ color: "#141414", fontWeight: 600 }}>{name}</span>
      </Title>


        {isFree ? (
          <Text strong style={{ fontSize: 18, color: "green" }}>
            Miễn phí
          </Text>
        ) : (
          <Space direction="vertical" size={0}>
            {/* Giá hiện tại */}
            <Text
              style={{
                fontSize: 24,
                color: "#e53935", // đỏ rực – tạo sự chú ý
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              🔥 Giá chỉ {formatFeeToVND(currentPrice)}
            </Text>

            {/* Giá gốc */}
            {discountInPercent > 0 && (
              <Text
                delete
                type="secondary"
                style={{
                  fontSize: 14,
                  textDecorationThickness: 2,
                  textDecorationColor: "#999",
                }}
              >
                {formatFeeToVND(originalPrice)}
              </Text>
            )}

            {/* Số tiền tiết kiệm */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#52c41a",
                marginTop: 4,
                backgroundColor: "#f6ffed",
                padding: "4px 8px",
                borderRadius: 6,
                display: "inline-block",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              🎁 Tiết kiệm lên đến {formatFeeToVND(originalPrice - currentPrice)}
            </Text>
          </Space>

        )}

        <Space direction="vertical" style={{ marginTop: 16, width: "100%" }}>
          <Button
            type="primary"
            size="large"
            block
            style={{ backgroundColor: "#fa541c", borderRadius: 8 }}
            onClick={handleAddToCart}
            
            disabled={isFree}
          >
            Thêm vào giỏ hàng
          </Button>
          <Button
            size="large"
            block
            style={{
              backgroundColor: "#13c2c2",
              color: "#fff",
              borderRadius: 8,
              border: "none",
            }}
            onClick={handleBuyNow}
          >
            {isFree ? "Học ngay" : "Đăng ký ngay"}
          </Button>
        </Space>

        <Divider />

        <div className="share-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Text strong>Chia sẻ khoá học</Text>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8cd3375628a2d19e34a2bdc59140bca2f452f3ffe1bae02993baccc6ba25b65"
            alt="Share"
            style={{ width: 24, height: 24, cursor: "pointer" }}
          />
        </div>
      </div>
    </Card>
  );
};

AddToCart.propTypes = {
  course: PropTypes.object.isRequired,
};

export default AddToCart;
