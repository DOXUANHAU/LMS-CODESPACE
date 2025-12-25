import React from "react";
import { Row, Col, Input, Select, Button } from "antd";

const { Option } = Select;

const UserFilter = () => {
  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={6}>
        <Input placeholder="Tìm theo tên hoặc email" />
      </Col>
      <Col span={6}>
        <Select defaultValue="all" style={{ width: "100%" }}>
          <Option value="all">Tất cả vai trò</Option>
          <Option value="User">User</Option>
          <Option value="Mentor">Mentor</Option>
          <Option value="Admin">Admin</Option>
        </Select>
      </Col>
      <Col>
        <Button type="primary">Lọc</Button>
      </Col>
    </Row>
  );
};

export default UserFilter;
