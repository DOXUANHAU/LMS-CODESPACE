import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    DashboardOutlined,
    BookOutlined,
    UnorderedListOutlined,
    SettingOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    WechatOutlined,
    HomeOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { key: "/home", label: "Trang chủ", icon: <HomeOutlined />, path: "/home" },
        { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, path: "/admin/dashboard" },
        { key: "users", label: "Users", icon: <UserOutlined />, path: "/admin/users" },
        { key: "categories", label: "Category", icon: <UnorderedListOutlined />, path: "/admin/categories" },
        { key: "courses", label: "Courses", icon: <BookOutlined />, path: "/admin/courses" },
        // { key: "communication", label: "Communication", icon: <WechatOutlined />, path: "/admin/communication" },
    ];

    return (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          style={{
            minHeight: "100vh",
            background: "#001529",
            position: "sticky",
            top: 0,
            boxShadow: "2px 0 6px rgba(0, 21, 41, 0.35)",
          }}
        >
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: "bold",
              color: "#fff",
              background: "linear-gradient(90deg, #1890ff 0%, #40a9ff 100%)",
              margin: "16px",
              borderRadius: 8,
            }}
          >
            {collapsed ? <UserOutlined style={{ fontSize: 22 }} /> : "AdminZone"}
          </div>
    
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems.map(({ key, label, icon, path }) => ({
              key,
              icon,
              label: <Link to={path} style={{ fontWeight: 500 }}>{label}</Link>,
            }))}
            style={{ borderRight: 0 }}
          />
    
          <div
            style={{
              textAlign: "center",
              padding: 12,
              marginTop: "auto",
            }}
          >
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                background: "#1890ff",
                border: "none",
                color: "#fff",
                fontSize: 18,
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
          </div>
        </Sider>
      );
}
