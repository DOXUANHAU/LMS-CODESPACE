import React from "react";
import { Avatar, Divider, Image } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  IdcardOutlined,
  CalendarOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import SocialButtons from "./SocialButtons";
import "./MentorSidebar.css"; // Thêm file CSS riêng cho style đẹp
import { baseURL } from "../../../../../api/constant";

function MentorSidebar({ avatar, degree, age, language, certificate, socialLinks }) {
  return (
    <div className="mentor-sidebar-container">
      <div className="mentor-avatar-wrapper">
        <Avatar
          size={200}
          src={avatar ? `${baseURL}/user/${avatar}` : "https://via.placeholder.com/200"}
          className="mentor-avatar"
        />
      </div>

      <div className="mentor-info-section">
        <div className="mentor-info-item">
          <IdcardOutlined /> <strong>Trình độ học vấn:</strong> {degree}
        </div>

        <div className="mentor-info-item">
          <CalendarOutlined /> <strong>Tuổi:</strong> {age}
        </div>

        <div className="mentor-info-item">
          <FileProtectOutlined /> <strong>Chứng chỉ ngôn ngữ:</strong> {language}
        </div>

        {certificate && (
          <div className="mentor-certificate">
            <Divider />
            <strong><FileProtectOutlined /> Hình ảnh Chứng chỉ:</strong>
            <Image
              src={`${baseURL}/user/${certificate}`}
              alt="certificate"
              className="mentor-certificate-img"
              width="100%"
              preview={{ mask: "Nhấn để phóng to" }}
            />
          </div>
        )}
      </div>

      <Divider />
      <SocialButtons links={socialLinks} />
    </div>
  );
}

MentorSidebar.propTypes = {
  avatar: PropTypes.string.isRequired,
  degree: PropTypes.string,
  age: PropTypes.number,
  language: PropTypes.string,
  certificate: PropTypes.string,
  socialLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MentorSidebar;
