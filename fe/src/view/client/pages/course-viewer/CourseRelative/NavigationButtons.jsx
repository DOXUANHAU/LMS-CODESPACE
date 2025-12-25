import React from "react";
import { Row, Col, Button } from "antd";
import PropTypes from "prop-types";
import { NAVIGATION_BUTTONS } from "./js/data";
import "./css/testimonial.css";

const NavigationButtons = ({ onNavigate }) => (
  <Row gutter={24}>
    <Col>
      <Button
        className="nav-button"
        onClick={() => onNavigate(NAVIGATION_BUTTONS.prev.direction)}
        icon={
          <img
            src={NAVIGATION_BUTTONS.prev.image}
            alt={NAVIGATION_BUTTONS.prev.alt}
          />
        }
      />
    </Col>
    <Col>
      <Button
        className="nav-button"
        onClick={() => onNavigate(NAVIGATION_BUTTONS.next.direction)}
        icon={
          <img
            src={NAVIGATION_BUTTONS.next.image}
            alt={NAVIGATION_BUTTONS.next.alt}
          />
        }
      />
    </Col>
  </Row>
);

NavigationButtons.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default NavigationButtons;
