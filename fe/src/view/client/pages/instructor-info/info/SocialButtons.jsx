import React from "react";
import { Button } from "antd";
import {
  GlobalOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

function SocialButtons({ links }) {
  // Map of button types to their respective icons
  const buttonIcons = {
    Website: <GlobalOutlined />,
    Twitter: <TwitterOutlined />,
    Youtube: <YoutubeOutlined />,
  };

  return (
    <div className="social-buttons-container">
      {links.map((link, index) => (
        <Button key={index} className="social-button" icon={buttonIcons[link]}>
          {link}
        </Button>
      ))}
    </div>
  );
}

SocialButtons.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SocialButtons;
