import React from "react";
import { Row, Col } from "antd";
import InstructorCard from "./InstructorCard";
import "./css/InstructorCardGrid.css";
import "antd/dist/reset.css";

const InstructorCardGrid = () => {
  // Sample data for instructors
  const instructors = Array(8).fill({
    name: "Ronald Richards",
    title: "UI/UX Designer",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e273a4db3219d9a3e2c9893e6074b891b8c5b4613fb8f608835ac45fc36c9f04?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c",
  });

  return (
    <div className="instructor-grid-container">
      <Row gutter={[16, 16]} className="instructor-row">
        {instructors.slice(0, 4).map((instructor, index) => (
          <Col key={index} className="instructor-col">
            <InstructorCard
              instructorImage={instructor.image}
              name={instructor.name}
              title={instructor.title}
            />
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} className="instructor-row">
        {instructors.slice(4, 8).map((instructor, index) => (
          <Col key={index + 4} className="instructor-col">
            <InstructorCard
              instructorImage={instructor.image}
              name={instructor.name}
              title={instructor.title}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InstructorCardGrid;
