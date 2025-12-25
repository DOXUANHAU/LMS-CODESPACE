import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/sideBar";

const { Content } = Layout;

export default function AdminLayout() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar />
            <Layout>
                <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
