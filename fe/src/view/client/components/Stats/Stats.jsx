import React from "react";
import { Row, Col, Divider } from "antd";
import "./styles.css";

const StatItem = ({ number, description }) => (
  <div className="stat-item">
    <div className="stat-number">{number}</div>
    <div className="stat-description">{description}</div>
  </div>
);

const Stats = () => {
  const stats = [
    { number: "250+", description: "Courses by our best mentors" },
    { number: "1000+", description: "Courses by our best mentors" },
    { number: "15+", description: "Courses by our best mentors" },
    { number: "2400+", description: "Courses by our best mentors" },
  ];

  return (
    <div className="stats-container">
      <Row justify="space-between" align="middle" gutter={[40, 40]}>
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <Col>
              <StatItem number={stat.number} description={stat.description} />
            </Col>
            {index < stats.length - 1 && (
              <Col>
                <div className="stats-divider" />
              </Col>
            )}
          </React.Fragment>
        ))}
      </Row>
    </div>
  );
};

export default Stats;
