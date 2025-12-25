import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import DashboardHeader from "./DashboardHeader";
import StatsCard from "./StatsCard";
import ChartCard from "./ChartCard";
import ReviewCard from "./ReviewCard";
import CourseCard from "./CourseCard";
import "./Dashboard.css";

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader title="Dashboard"/>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <StatsCard value="$1K" label="Life Time Courses Commission" />
          <StatsCard value="$800.0" label="Life Time Received Commission" />
          <StatsCard value="$200.00" label="Life Time Pending Commission" />
        </Col>

        <Col xs={24} lg={16}>
          <ChartCard />
        </Col>
      </Row>

      {/* Reviews Section */}
      <div className="section-container">
        <Title level={4} className="section-title">Reviews</Title>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={8} md={4}><ReviewCard label="Total Reviews" value="1000" /></Col>
          <Col xs={24} sm={8} md={4}><ReviewCard label="1 star reviews" value="100" color="red-tag" /></Col>
          <Col xs={24} sm={8} md={4}><ReviewCard label="2 star reviews" value="100" color="yellow-tag" /></Col>
          <Col xs={24} sm={8} md={4}><ReviewCard label="3 star reviews" value="100" color="gold-tag" /></Col>
          <Col xs={24} sm={8} md={4}><ReviewCard label="4 star reviews" value="100" color="light-green-tag" /></Col>
          <Col xs={24} sm={8} md={4}><ReviewCard label="5 star reviews" value="100" color="green-tag" /></Col>
        </Row>
      </div>

      {/* Courses Section */}
      <div className="section-container">
        <Title level={4} className="section-title">Courses</Title>
        <Row gutter={[10, 10]}>
          {[1, 2, 3].map((index) => (
            <Col xs={24} md={8} key={index}>
              <CourseCard title="Beginner's Guide to Design" price="50.00" certificates="25" chapters="13" reviews="25" orders="254" shelf="500" />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
