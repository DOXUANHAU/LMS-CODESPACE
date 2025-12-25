import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const HeaderSearch = () => {
  return (
    <Input
      prefix={<SearchOutlined className="search-icon" />}
      placeholder="Tìm kiếm khóa học"
      className="header-search"
      allowClear
    />
  );
};
