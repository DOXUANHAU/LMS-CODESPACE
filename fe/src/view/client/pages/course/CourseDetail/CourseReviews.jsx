import React from "react";
import { Rate, Progress, Avatar, Button, List } from "antd";
import {
  ReviewsSection,
  ReviewsHeader,
  RatingOverview,
  RatingStats,
  ReviewItem,
  ReviewerInfo,
  ReviewContent,
  ReviewDate,
  ViewMoreButton,
} from "../js/styles";

const reviewsData = [
  {
    name: "Mark Doe",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7f12b0763e214e3aebac2c69b9f47de27f20ca3f09903f92def4aba1e1ff538f",
    rating: 5,
    date: "Reviewed on 22nd March, 2024",
    content:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
  },
  // Add more review data as needed
];

const ratingStats = [
  { stars: 5, percentage: 80 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 2 },
];

const CourseReviews = ({course}) => {
  return (
    <ReviewsSection>
      <ReviewsHeader>
        <RatingOverview>
          <div>
            <Rate disabled defaultValue={4.6} /> 4.6
          </div>
          <span>146,951 đánh giá</span>
        </RatingOverview>

        <RatingStats>
          {ratingStats.map((stat) => (
            <div key={stat.stars}>
              <span>{stat.stars} stars</span>
              <Progress percent={stat.percentage} showInfo={false} />
              <span>{stat.percentage}%</span>
            </div>
          ))}
        </RatingStats>
      </ReviewsHeader>

      <List
        dataSource={reviewsData}
        renderItem={(review) => (
          <ReviewItem>
            <ReviewerInfo>
              <Avatar size={60} src={review.avatar} />
              <span>{review.name}</span>
            </ReviewerInfo>
            <ReviewContent>
              <div>
                <Rate disabled defaultValue={review.rating} />
                <ReviewDate>{review.date}</ReviewDate>
              </div>
              <p>{review.content}</p>
            </ReviewContent>
          </ReviewItem>
        )}
      />

      <ViewMoreButton>View more Reviews</ViewMoreButton>
    </ReviewsSection>
  );
};

export default CourseReviews;