import React from "react";
import { Typography, Space } from "antd";
import CTAButton from "./CTAButton";

const { Title, Paragraph } = Typography;

const BannerContent = () => (
  <Space direction="vertical" size={20} className="banner-content">
    <Title level={1} className="banner-title">
      Đánh thức tiềm năng cùng GiantWisdom
    </Title>

    <Paragraph className="banner-text">
      Chào mừng bạn đến với GiantWisdom, nơi học tập không có giới hạn. Chúng
      tôi tin rằng giáo dục là chìa khóa cho sự phát triển cá nhân và chuyên
      nghiệp. Cho dù bạn là sinh viên, người đi làm hay người học suốt đời, hệ
      thống quản lý học tập của chúng tôi sẽ nâng cao trải nghiệm của bạn.
    </Paragraph>

    <CTAButton>Bắt đầu hành trình giảng dạy của bạn</CTAButton>
  </Space>
);

export default BannerContent;
