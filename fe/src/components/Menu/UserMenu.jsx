import React from "react";
import { Menu, Divider, Avatar, Typography, Space } from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./styles.css";

const { Text, Title } = Typography;

const UserMenu = () => {
  return (
    <div className="user-menu">
      <div className="user-profile">
        <Space>
          <Avatar size={60} style={{ backgroundColor: "#64748B" }}>
            J
          </Avatar>
          <div className="user-info">
            <Title level={5} style={{ margin: 0 }}>
              John Doe
            </Title>
            <Text type="secondary">johndoe@test.com</Text>
          </div>
        </Space>
      </div>

      <Divider className="menu-divider" />

      <Menu
        mode="vertical"
        className="navigation-menu"
        items={[
          {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "orders",
            icon: <ShoppingCartOutlined />,
            label: "Order Page",
          },
          {
            key: "courses",
            icon: <BookOutlined />,
            label: "My Courses",
          },
        ]}
      />

      <Divider className="menu-divider" />

      <Menu
        mode="vertical"
        className="navigation-menu"
        items={[
          {
            key: "help",
            icon: <QuestionCircleOutlined />,
            label: "Help",
          },
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Log Out",
          },
        ]}
      />
    </div>
  );
};

export default UserMenu;
