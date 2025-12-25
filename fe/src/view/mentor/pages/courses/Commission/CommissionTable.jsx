// CommissionTable.js
import React from "react";
import { Table, Tag } from "antd";
import { SortAscendingOutlined } from "@ant-design/icons";

const CommissionTable = ({ data }) => {
  // Table columns configuration
  const columns = [
    {
      title: (
        <div className="table-header">
          <span>Order ID</span>
          <SortAscendingOutlined className="sort-icon" />
        </div>
      ),
      dataIndex: "orderId",
      key: "orderId",
      width: 139,
    },
    {
      title: (
        <div className="table-header">
          <span>Customer</span>
          <SortAscendingOutlined className="sort-icon" />
        </div>
      ),
      dataIndex: "customer",
      key: "customer",
      width: 292,
    },
    {
      title: (
        <div className="table-header">
          <span>Type</span>
          <SortAscendingOutlined className="sort-icon" />
        </div>
      ),
      dataIndex: "type",
      key: "type",
      width: 164,
    },
    {
      title: (
        <div className="table-header">
          <span>Date</span>
          <SortAscendingOutlined className="sort-icon" />
        </div>
      ),
      dataIndex: "date",
      key: "date",
      width: 157,
    },
    {
      title: (
        <div className="table-header">
          <span>Status</span>
          <SortAscendingOutlined className="sort-icon" />
        </div>
      ),
      dataIndex: "status",
      key: "status",
      width: 164,
      render: (status) => (
        <Tag
          color={status === "Received" ? "success" : "warning"}
          className="status-tag"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: (
        <div className="table-header">
          <span>Commission</span>
          <SortAscendingOutlined className="sort-icon" />
        </div>
      ),
      dataIndex: "commission",
      key: "commission",
      width: 169,
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={data} // Sử dụng data truyền vào
        pagination={false}
        className="commission-table"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default CommissionTable;
