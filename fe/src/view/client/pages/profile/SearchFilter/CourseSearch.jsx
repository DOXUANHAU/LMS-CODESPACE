import React from "react";
import { Input, Button, Space, Typography } from "antd";
import {
  SearchOutlined,
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import "./styles.css";

const { Text } = Typography;

const SearchFilter = ({title}) => {
  return (
    <div className="course-search-container">
      <div className="course-count">
        {title} <span className="count-number">(12)</span>
      </div>

      <div className="search-controls">
        <div className="search-wrapper">
          <Input
            placeholder="Search User"
            prefix={<SearchOutlined className="search-icon" />}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <Space className="sort-section">
            <Text className="sort-label">Sort By</Text>
            <Button className="relevance-button">
              Relevance
              <DownOutlined />
            </Button>
          </Space>

          <Button className="filter-button" icon={<FilterOutlined />}>
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
