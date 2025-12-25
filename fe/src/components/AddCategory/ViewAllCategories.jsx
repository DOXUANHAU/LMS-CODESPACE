import { useState } from "react";
import { Table, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const ViewAllCategories = () => {
  const [allCategories] = useState([
    { id: 1, name: "Web Development", description: "Courses on web technologies" },
    { id: 2, name: "Data Science", description: "Learn about data analysis and AI" },
    { id: 3, name: "Cyber Security", description: "Protect networks and systems" },
  ]);

  let navigate = useNavigate();

  const updateCategory = (category) => {
    navigate("/admin/course/category/update", { state: category });
  };

  const columns = [
    {
      title: "Category Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => updateCategory(record)}>
            Update
          </Button>
          <Button danger style={{ marginLeft: "10px" }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card title="All Event Categories" bordered style={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}>
      <Table dataSource={allCategories} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
    </Card>
  );
};

export default ViewAllCategories;
