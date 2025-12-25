import React from "react";
import { Typography, Tabs, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TabPane } = Tabs;

const Header = ({ title }) => {
  // Menu for the more options dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1">Edit</Menu.Item>
      <Menu.Item key="2">Delete</Menu.Item>
      <Menu.Item key="3">Export</Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* Header section */}
      <div className="dashboard-header">
        <Title level={4} className="dashboard-title">
          {title}
        </Title>
        <Dropdown overlay={menu} trigger={["click"]}>
          <MoreOutlined className="more-icon" />
        </Dropdown>
      </div>

      {/* Navigation tabs */}
      <Tabs defaultActiveKey="1" className="dashboard-tabs">
        <TabPane tab="Commission" key="1" className="active-tab" />
        <TabPane tab="Reviews" key="2" />
        <TabPane tab="Customer" key="3" />
        <TabPane tab="Chapters" key="4" />
        <TabPane tab="Promotion" key="5" />
        <TabPane tab="Detail" key="6" />
        <TabPane tab="Settings" key="7" />
      </Tabs>
    </>
  );
};

export default Header;
