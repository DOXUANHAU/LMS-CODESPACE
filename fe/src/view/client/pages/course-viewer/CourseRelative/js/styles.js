import styled from "styled-components";
import { Tabs, Button } from "antd";

export const CourseDetailsWrapper = styled.div`
  padding: 40px 80px 17px;
  background-color: #fff;

  @media (max-width: 991px) {
    padding: 20px;
  }
`;

export const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    font-size: 14px;
    padding: 18px 21px;
    border-radius: 8px;

    &.ant-tabs-tab-active {
      background-color: #eff6ff;
    }
  }
`;

export const DescriptionSection = styled.div`
  margin-top: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
`;

export const SectionText = styled.p`
  font-size: 16px;
  color: #334155;
  line-height: 26px;
  margin-bottom: 24px;
`;

export const InstructorSection = styled.div`
  margin-top: 24px;
`;

export const InstructorName = styled.h2`
  font-size: 20px;
  color: #2563eb;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const InstructorTitle = styled.p`
  font-size: 16px;
  color: #334155;
  margin-bottom: 16px;
`;

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #0f172a;
`;

export const InstructorStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;

  .stat-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #0f172a;

    .anticon {
      font-size: 24px;
      color: #334155;
    }
  }

  @media (max-width: 991px) {
    padding: 12px 0;
  }
`;

export const InstructorBio = styled.p`
  font-size: 16px;
  color: #334155;
  line-height: 26px;
  margin-top: 16px;
`;

export const SyllabusSection = styled.div`
  margin-top: 24px;
`;

export const SyllabusTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 16px;
`;

export const LessonItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
`;

export const LessonTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
`;

export const LessonStats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #334155;
`;

export const ReviewsSection = styled.div`
  margin-top: 24px;
`;

export const ReviewsHeader = styled.div`
  margin-bottom: 24px;
`;

export const RatingOverview = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  .ant-rate {
    font-size: 20px;
  }
`;

export const RatingStats = styled.div`
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    .ant-progress {
      width: 100px;
    }
  }
`;

export const ReviewItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  margin-bottom: 16px;
`;

export const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  span {
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
  }
`;

export const ReviewContent = styled.div`
  flex: 1;

  .ant-rate {
    margin-right: 28px;
  }
`;

export const ReviewDate = styled.span`
  font-size: 14px;
  color: #334155;
`;

export const ViewMoreButton = styled(Button)`
  margin-top: 16px;
  padding: 13px 24px;
  height: auto;
  border-radius: 8px;
  border: 1px solid #0f172a;
  color: #0f172a;
  font-weight: 500;

  &:hover {
    color: #fff;
    background: #0f172a;
  }
`;
