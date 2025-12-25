import React from "react";
import { Typography } from "antd";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

function MentorHeader({ name, title, students, course }) {
  return (
    <div className="mentor-header">
      <div>
        <Text className="instructor-label">Giảng Viên</Text>
        <div className="mentor-name-container">
          <Title level={2} className="mentor-name">
            {name}
          </Title>
          <Text className="mentor-title">{title}</Text>
        </div>
      </div>
      <div className="mentor-stats">
        <div className="stat-item">
          <Text className="stat-label">Số lượng Học viên</Text>
          <Title level={3} className="stat-value">
            {students}
          </Title>
        </div>
        <div className="stat-item">
          <Text className="stat-label">Số khóa học giảng dạy</Text>
          <Title level={3} className="stat-value">
            {course}
          </Title>
        </div>
      </div>
    </div>
  );
}

MentorHeader.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  students: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
};

export default MentorHeader;
