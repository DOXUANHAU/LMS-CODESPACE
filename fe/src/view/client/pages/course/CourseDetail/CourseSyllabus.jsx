import React from "react";
import { List, Space } from "antd";
import { ClockCircleOutlined, ReadOutlined } from "@ant-design/icons";
import {
  SyllabusSection,
  SyllabusTitle,
  LessonItem,
  LessonTitle,
  LessonStats,
} from "../js/styles";

const CourseSyllabus = ({ course }) => {

  return (
    <SyllabusSection>
      <SyllabusTitle>Chương trình học</SyllabusTitle>
      <List
        dataSource={course.sections || []}
        renderItem={(item) => (
          <LessonItem>
            <LessonTitle>{item.name}</LessonTitle>
            <LessonStats>
              <Space>
                <ReadOutlined />
                <span>{item.courseSectionTopics?.length || 0} Bài giảng</span>
              </Space>
              <Space>
                <ClockCircleOutlined />
                <span>~{(item.courseSectionTopics?.length || 0) * 10} phút</span>
              </Space>
            </LessonStats>
          </LessonItem>
        )}
      />
    </SyllabusSection>
  );
};

export default CourseSyllabus;
