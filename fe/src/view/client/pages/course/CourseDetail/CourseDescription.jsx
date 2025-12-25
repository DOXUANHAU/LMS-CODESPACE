import React from "react";
import { Typography } from "antd";
import { DescriptionSection, SectionTitle, SectionText } from "../js/styles";

const { Title, Paragraph } = Typography;

const CourseDescription = ({course}) => {
  return (
    <DescriptionSection>
      <SectionTitle>Yêu cầu trước khi học</SectionTitle>
      <SectionText>
        {course.prerequisite}
      </SectionText>

      <SectionTitle>Ghi chú đặt biệt của khóa học</SectionTitle>
      <SectionText>
        {course.specialNote || "Không có ghi chú đặt biệt"}
      </SectionText>
    </DescriptionSection>
  );
};

export default CourseDescription;