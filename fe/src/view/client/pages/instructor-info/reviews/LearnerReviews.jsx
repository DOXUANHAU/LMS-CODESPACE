import React from "react";
import { Row, Col, Typography, Button, Divider } from "antd";
import { StarFilled } from "@ant-design/icons";
import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";
import "./styles.css";

const { Title, Text } = Typography;

const reviewsData = [
  {
    id: 1,
    name: "Mark Doe",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7f12b0763e214e3aebac2c69b9f47de27f20ca3f09903f92def4aba1e1ff538f?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
    rating: 5,
    date: "22nd March, 2024",
    content:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
  },
  {
    id: 2,
    name: "Mark Doe",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7f12b0763e214e3aebac2c69b9f47de27f20ca3f09903f92def4aba1e1ff538f?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
    rating: 5,
    date: "22nd March, 2024",
    content:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
  },
  {
    id: 3,
    name: "Mark Doe",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7f12b0763e214e3aebac2c69b9f47de27f20ca3f09903f92def4aba1e1ff538f?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
    rating: 5,
    date: "22nd March, 2024",
    content:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
  },
];

const LearnerReviews = () => {
  return (
    <div className="learner-reviews-container">
      <Title level={4} className="learner-reviews-title">
        Learner Reviews
      </Title>

      <Row gutter={[40, 16]} className="reviews-content">
        <Col xs={24} md={8} lg={6}>
          <RatingSummary
            overallRating={4.6}
            totalReviews={146951}
            ratingDistribution={[
              {
                percent: 80,
                starImg:
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/1076fb36f96b607627f7f7469d52949121207c29373df4f74fff60508e950946?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
              },
              {
                percent: 10,
                starImg:
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/21c0dff1b2c215646544bade60300fbbbf77bab935e1db0071c820b318a9545d?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
              },
              {
                percent: 5,
                starImg:
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/1704737921d87cbdd5c3db9a915c1fe977251d86822f0a95239fd798e9fe7037?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
              },
              {
                percent: 3,
                starImg:
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/65a7bfe9dd91325b9dc4a51683675142a4c2a85b95d5a57622ba8727311df75a?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
              },
              {
                percent: 2,
                starImg:
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/41a96146c88ff951e92f78bb9878d42e801bfe24d513e2e665c633d758935c4c?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
              },
            ]}
          />
        </Col>

        <Col xs={24} md={16} lg={18}>
          <div className="reviews-list">
            {reviewsData.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                avatar={review.avatar}
                rating={review.rating}
                date={review.date}
                content={review.content}
              />
            ))}

            <Button className="view-more-button">View more Reviews</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LearnerReviews;
