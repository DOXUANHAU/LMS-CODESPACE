import React from "react";
import { Tabs } from "antd";
import CourseDescription from "./CourseDescription";
import CourseInstructor from "./CourseInstructor";
import CourseSyllabus from "./CourseSyllabus";
import CourseReviews from "./CourseReviews";
import { StyledTabs, CourseDetailsWrapper } from "../js/styles";

const CourseDetails = ({ course, ratings }) => {
  const items = [
    {
      key: "1",
      label: "Mô tả khóa học",
      children: <CourseDescription course={course} />,
    },
    {
      key: "2",
      label: "Giảng viên",
      children: <CourseInstructor course={course} ratings={ratings} />,
    },
    {
      key: "3",
      label: "Chương trình học",
      children: <CourseSyllabus course={course} />,
    },
    {
      key: "4",
      label: "Đánh giá",
      children: <CourseReviews course={course} />,
    },
  ];

  return (
    <CourseDetailsWrapper>
      <StyledTabs items={items} defaultActiveKey="1" />
    </CourseDetailsWrapper>
  );
};

export default CourseDetails;