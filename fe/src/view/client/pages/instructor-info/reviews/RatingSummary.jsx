import React from "react";
import { Typography, Progress } from "antd";
import { StarFilled } from "@ant-design/icons";
import "./styles.css";

const { Text } = Typography;

const RatingSummary = ({ overallRating, totalReviews, ratingDistribution }) => {
  // Format the total reviews with commas
  const formattedTotalReviews = totalReviews.toLocaleString();

  return (
    <div className="rating-summary">
      <div className="overall-rating">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c33c371cb6ad9f77ff78ac66dc2e190e51fc32e6aac73c37e89e26e91b409e42?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c"
          alt="Star"
          style={{ width: "20px", height: "20px" }}
        />
        <Text className="rating-value">{overallRating}</Text>
      </div>
      <Text className="total-reviews">{formattedTotalReviews} reviews</Text>

      <div className="rating-distribution">
        {ratingDistribution.map((rating, index) => (
          <div className="rating-bar" key={index}>
            <img
              src={rating.starImg}
              alt={`${5 - index} stars rating`}
              className="rating-bar-progress"
            />
            <Text className="rating-percentage">{rating.percent}%</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;
