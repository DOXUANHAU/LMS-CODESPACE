import React from "react";
import { Button } from "antd";

const CTAButton = ({ children, ...props }) => (
  <Button type="primary" size="large" className="cta-button" {...props}>
    {children}
  </Button>
);

export default CTAButton;
