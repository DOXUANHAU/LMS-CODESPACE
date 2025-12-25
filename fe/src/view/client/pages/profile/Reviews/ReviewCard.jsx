import React from "react";
import { Card, Rate, Typography } from "antd";
import styled from "styled-components";

const { Text, Title } = Typography;

const ReviewCard = ({ review }) => {
  return (
    <StyledCard>
      <CardContent>
        <CourseSection>
          <Label>Course Name:</Label>
          <CourseName>{review.courseName}</CourseName>
        </CourseSection>

        <RatingSection>
          <Label>Rating:</Label>
          <StyledRate disabled defaultValue={review.rating} />
        </RatingSection>

        <ReviewSection>
          <Label>Review:</Label>
          <ReviewText>{review.text}</ReviewText>
        </ReviewSection>
      </CardContent>

      <DeleteIcon
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d63a5fc2c5586a61568dadfd60e7fcc434fcc26de3d8c0acfaf3a36beb5dbc5?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c"
        alt="Delete review"
      />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  padding: 18px 16px;
  margin-top: 16px;
  gap: 46px;
  font-family:
    Inter,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CourseSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0f172a;
`;

const Label = styled(Text)`
  font-size: 14px;
  color: #0f172a;
`;

const CourseName = styled(Title).attrs({ level: 4 })`
  margin: 0 !important;
  font-size: 18px !important;
  line-height: 1.6 !important;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledRate = styled(Rate)`
  font-size: 16px;
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReviewText = styled(Text)`
  color: #334155;
  font-size: 16px;
  line-height: 26px;
`;

const DeleteIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export default ReviewCard;
