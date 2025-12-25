// components/admin/user/UserTable.jsx
import { Table, Tag, Avatar, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import React from "react";

const UserTable = ({ users, onViewDetail }) => {
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar src={avatar} />, // hiển thị hình đại diện
    },
    {
      title: "Họ tên",
      key: "fullName",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "emailId",
      key: "emailId",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color="blue">{role.toUpperCase()}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "active" ? "green" : status === "inactive" ? "orange" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => onViewDetail(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 10 }} />;
};

export default UserTable;
