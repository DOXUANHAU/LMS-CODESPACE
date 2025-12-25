import React from "react";
import {
  Card,
  Button,
  Select,
  Rate,
  Checkbox,
  Typography,
  Space,
  Divider,
} from "antd";
import { FilterOutlined, DownOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CourseFilters = () => {
  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <div className="filter-header">
        <Button icon={<FilterOutlined />}>Filter</Button>
        <Space>
          <Text>Sort By</Text>
          <Select
            defaultValue="relevance"
            style={{ width: 120 }}
            options={[
              { value: "relevance", label: "Relevance" },
              { value: "newest", label: "Newest" },
              { value: "popular", label: "Popular" },
            ]}
          />
        </Space>
      </div>

      <Card className="filter-section">
        <Space direction="vertical" style={{ width: "100%" }}>
          <div className="filter-group">
            <Title level={5}>Rating</Title>
            <Space direction="vertical">
              <Rate disabled defaultValue={5} />
              <Rate disabled defaultValue={4} />
              <Rate disabled defaultValue={3} />
              <Rate disabled defaultValue={2} />
              <Rate disabled defaultValue={1} />
            </Space>
          </div>

          <Divider />

          <div className="filter-group">
            <Title level={5}>Number of Chapters</Title>
            <Space direction="vertical">
              <Checkbox>1-10</Checkbox>
              <Checkbox>10-15</Checkbox>
              <Checkbox>15-20</Checkbox>
              <Checkbox>20-25</Checkbox>
              <Button type="link">See More</Button>
            </Space>
          </div>

          <Divider />

          <div className="filter-group">
            <Title level={5}>Price</Title>
          </div>

          <Divider />

          <div className="filter-group">
            <Title level={5}>Category</Title>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default CourseFilters;
