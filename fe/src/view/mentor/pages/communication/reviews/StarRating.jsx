import React from "react";
import { Space } from "antd";
import { StarFilled } from "@ant-design/icons";

const StarRating = ({ rating }) => {
  return (
    <Space className="star-rating" size={2}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarFilled
          key={star}
          className={star <= rating ? "star-filled" : "star-empty"}
        />
      ))}
    </Space>
  );
};

export default StarRating;
