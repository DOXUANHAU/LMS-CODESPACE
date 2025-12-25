import React, { useState } from "react";
import {
  Layout,
  Typography,
  Tabs,
  Space,
  Button,
  Checkbox,
  Dropdown,
  Card,
  Row,
  Col,
} from "antd";
import { MoreOutlined, DownOutlined } from "@ant-design/icons";
import "./css/reviews.css";
import ReviewCard from "../../../../client/pages/profile/Reviews/ReviewCard";

const { Title } = Typography;
const { TabPane } = Tabs;

const ReviewsPage = () => {
  const [activeTab, setActiveTab] = useState("reviews");

  // Filter states
  const [hasComment, setHasComment] = useState(false);
  const [notAnswered, setNotAnswered] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest First");

  // Rating filter options
  const ratingItems = [
    { key: "all", label: "All" },
    { key: "5", label: "5 Stars" },
    { key: "4", label: "4 Stars" },
    { key: "3", label: "3 Stars" },
    { key: "2", label: "2 Stars" },
    { key: "1", label: "1 Star" },
  ];

  // Sort options
  const sortItems = [
    { key: "newest", label: "Newest First" },
    { key: "oldest", label: "Oldest First" },
    { key: "highest", label: "Highest Rating" },
    { key: "lowest", label: "Lowest Rating" },
  ];

  // Sample review data
  const reviews = [
    {
      id: 1,
      rating: 4,
      courseName: "Beginners Guide to Design",
      userName: "Chris Walter",
      timeAgo: "3 days ago",
      text:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
    {
      id: 2,
      rating: 4,
      courseName: "Data Warehouse - The Ultimate Guide",
      userName: "Michel Evans",
      timeAgo: "3 days ago",
      text:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
    {
      id: 3,
      rating: 5,
      courseName: "Beginners Guide to Design",
      userName: "Chris Walter",
      timeAgo: "3 days ago",
      text:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
    {
      id: 4,
      rating: 5,
      courseName: "Beginners Guide to Design",
      userName: "Chris Walter",
      timeAgo: "3 days ago",
      text:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
  ];

  return (
    <Layout className="reviews-container">
      <div className="reviews-wrapper">
        {/* Header Section */}
        <div className="reviews-header">
          <div className="header-top">
            <Title level={4} className="header-title">
              Communication
            </Title>
            <Button type="text" icon={<MoreOutlined />} />
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="communication-tabs"
          >
            <TabPane tab="Reviews" key="reviews" />
            <TabPane tab="Messages" key="messages" />
            <TabPane tab="Notification" key="notification" />
          </Tabs>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-row">
            <div className="filters-left">
              <Space size="large" className="filter-options">
                <Checkbox
                  checked={hasComment}
                  onChange={(e) => setHasComment(e.target.checked)}
                >
                  Has a Comment
                </Checkbox>

                <Checkbox
                  checked={notAnswered}
                  onChange={(e) => setNotAnswered(e.target.checked)}
                >
                  Not Answered
                </Checkbox>

                <Space className="rating-filter">
                  <span className="filter-label">Rating:</span>
                  <Dropdown
                    menu={{
                      items: ratingItems,
                      onClick: (e) => setRatingFilter(e.item.props.label),
                    }}
                  >
                    <Button>
                      <Space>
                        {ratingFilter}
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </Space>

                <Space className="sort-filter">
                  <span className="filter-label">Sort by:</span>
                  <Dropdown
                    menu={{
                      items: sortItems,
                      onClick: (e) => setSortBy(e.item.props.label),
                    }}
                  >
                    <Button>
                      <Space>
                        {sortBy}
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </Space>
              </Space>
            </div>

            <Button type="primary" className="export-btn">
              Export to CSV
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          <Row gutter={[0, 20]}>
            {reviews.map((review) => (
              <Col span={24} key={review.id}>
                <ReviewCard key={review.id} review={review} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewsPage;
