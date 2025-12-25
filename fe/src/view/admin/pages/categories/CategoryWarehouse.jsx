import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Space, message, Modal } from "antd";
import { UndoOutlined, DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import categoryApi from "../../../../api/categoryApi";

const CategoryWarehouse = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    fetchDeletedCategories();
  }, []);

  const fetchDeletedCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.fetchAllCategoriesDeletedTrue(); // API lấy danh sách category bị xóa
      setCategories(Array.isArray(response.data.categories) ? response.data.categories : []);
    } catch (error) {
      message.error("Failed to fetch deleted categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      const response = await categoryApi.restoreCategory(id);
      if (response.data?.success) {
        message.success("Category restored successfully!");
        fetchDeletedCategories();
      } else {
        message.error("Failed to restore category.");
      }
    } catch (error) {
      message.error("Failed to restore category.");
    }
  };

  const showDeleteConfirm = (id) => {
    setSelectedCategoryId(id);
    setDeleteConfirmVisible(true);
  };

  const handleDelete = async () => {
    try {
      const response = await categoryApi.permanentlyDeleteCategory(selectedCategoryId);
      if (response.data?.success) {
        message.success("Category deleted permanently!");
        fetchDeletedCategories();
      } else {
        message.error("Failed to delete category.");
      }
    } catch (error) {
      message.error("Failed to delete category.");
    } finally {
      setDeleteConfirmVisible(false);
      setSelectedCategoryId(null);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status", 
      render: (status) => <Tag color="red">DELETED</Tag> 
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Button icon={<UndoOutlined />} onClick={() => handleRestore(record.id)}>
            Restore
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => showDeleteConfirm(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" icon={<ArrowLeftOutlined />} onClick={handleGoBack} style={{ marginBottom: 16, marginLeft: 16 }}>
        Go Back
      </Button>
      <h2>Deleted Categories</h2>
      <Table columns={columns} dataSource={categories} rowKey="id" loading={loading} />

      <Modal
        title="Confirm Deletion"
        visible={deleteConfirmVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteConfirmVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc muốn xóa Category sau ra khỏi database? Thao tác này sẽ không thể hoàn lại.</p>
      </Modal>
    </div>
  );
};

export default CategoryWarehouse;
