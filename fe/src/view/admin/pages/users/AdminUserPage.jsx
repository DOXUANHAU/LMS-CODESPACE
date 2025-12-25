import React from "react";
import { Card, Typography } from "antd";
import UserFilter from "./UserFilter";
import UserTable from "./UserTable";

const { Title } = Typography;

const AdminUserPage = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý người dùng</Title>
      <Card style={{ marginTop: 24 }}>
        <UserFilter />
        <UserTable />
      </Card>
    </div>
  );
};

export default AdminUserPage;
