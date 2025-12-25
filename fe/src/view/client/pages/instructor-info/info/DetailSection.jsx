import React from "react";
import PropTypes from "prop-types";
import { Typography, List } from "antd";

const { Title, Paragraph } = Typography;

const DetailSection = ({ title, content, isList = false }) => {
  return (
    <div className="detail-section" style={{ marginBottom: 24 }}>
      <Title level={4} style={{ marginBottom: 12 }}>
        {title}
      </Title>
      {isList ? (
        <List
          size="small"
          dataSource={content}
          renderItem={(item) => <List.Item>- {item}</List.Item>}
          style={{ paddingLeft: 16 }}
        />
      ) : (
        <Paragraph style={{ color: "#555", lineHeight: 1.6 }}>{content}</Paragraph>
      )}
    </div>
  );
};

DetailSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  isList: PropTypes.bool,
};

export default DetailSection;
