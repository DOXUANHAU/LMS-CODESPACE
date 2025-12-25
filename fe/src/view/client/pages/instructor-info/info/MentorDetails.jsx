import React from "react";
import PropTypes from "prop-types";
import DetailSection from "./DetailSection";
import "../MentorDetails.css"; // Gợi ý tạo CSS riêng nếu cần style tùy chỉnh

const MentorDetails = ({ about, expertise, experience }) => {
  return (
    <div className="mentor-details">
      <DetailSection title="Giới thiệu về Giảng viên" content={about} />
      <DetailSection title="Lĩnh vực chuyên môn" content={expertise} isList />
      <DetailSection title="Kinh nghiệm làm việc" content={experience} />
    </div>
  );
};

MentorDetails.propTypes = {
  about: PropTypes.string.isRequired,
  expertise: PropTypes.arrayOf(PropTypes.string).isRequired,
  experience: PropTypes.string.isRequired,
};

export default MentorDetails;
