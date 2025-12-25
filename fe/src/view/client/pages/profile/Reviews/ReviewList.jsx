import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import ReviewCard from './ReviewCard';
import ReviewPagination from '../../../components/Pagination/Pagination';

const { Title } = Typography;

const MOCK_REVIEWS = [
  {
    id: 1,
    courseName: "Beginner's Guide to Design",
    rating: 5,
    text: "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding."
  },
  // Add more mock reviews as needed
];

const ReviewList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Container>
      <ReviewsWrapper>
        <ReviewsHeader>
          Reviews <ReviewCount>(12)</ReviewCount>
        </ReviewsHeader>

        {MOCK_REVIEWS.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}

        <ReviewPagination
          current={currentPage}
          onChange={setCurrentPage}
        />
      </ReviewsWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  padding: 105px 80px 483px;
  display: flex;
  justify-content: center;

  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

const ReviewsWrapper = styled.div`
  width: 902px;
  max-width: 100%;
`;

const ReviewsHeader = styled(Title).attrs({ level: 2 })`
  color: #0f172a;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 20px !important;
  margin-bottom: 16px !important;
`;

const ReviewCount = styled.span`
  font-size: 12px;
  line-height: 15px;
`;

export default ReviewList;
