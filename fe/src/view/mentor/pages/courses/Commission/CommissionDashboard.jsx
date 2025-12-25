import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import Header from "./Header";
import StatisticsCards from "./StatisticsCards";
import CommissionTable from "./CommissionTable";
import "./css/CommissionDashboard.css";
import { useParams } from "react-router-dom";
import { data } from "./js/data"; // Dữ liệu mẫu

const CommissionDashboard = () => {
  const { id } = useParams(); // Lấy id của khóa học từ URL
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const foundCourse = data.find(course => course.id === parseInt(id));
    setCourseData(foundCourse);
  }, [id]);

  if (!courseData) {
    return <div>Course not found</div>;
  }

  return (
    <div className="commision-dashboard-container">
      {/* Header Component */}
      <Header title={`Commission Dashboard for ${courseData.orderId}`} />

      {/* Statistics Cards Component */}
      <StatisticsCards course={courseData} />

      {/* Commission Table Component - truyền data vào */}
      <CommissionTable data={data} />
    </div>
  );
};

export default CommissionDashboard;
