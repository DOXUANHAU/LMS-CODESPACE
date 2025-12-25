import React from "react";
import { Space, Button, Popconfirm, message } from "antd";

const UserActions = ({ user }) => {
  const handleDelete = () => {
    message.success(`Đã xóa user ${user.firstName}`);
  };

  return (
    <Space>
      <Button type="link">Sửa</Button>
      <Popconfirm title="Xác nhận xóa?" onConfirm={handleDelete}>
        <Button danger type="link">
          Xóa
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default UserActions;
