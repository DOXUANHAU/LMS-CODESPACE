import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, HomeOutlined } from "@ant-design/icons";
import AddCategoryForm from "../../../../components/AddCategory/AddCategoryForm";
import UpdateCategoryForm from "../../../../components/AddCategory/UpdateCategoryForm";
import categoryApi from "../../../../api/categoryApi";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.fetchAllCategories();
      setCategories(Array.isArray(response.data.categories) ? response.data.categories : []);
    } catch (error) {
      message.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
    fetchCategories();
  };

  const handleOpenUpdateModal = (category) => {
    setSelectedCategory(category);
    setIsUpdateModalVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  const handleUpdate = async (updatedCategory) => {
    console.log("🚀 ID gửi lên BE:", selectedCategory.id);
    
    try {
        const response = await categoryApi.updateCategory({
            id: selectedCategory.id, 
            name: updatedCategory.name,
            description: updatedCategory.description,
            status: updatedCategory.status,
        });

        console.log("📡 Phản hồi từ BE:", response);

        if (response.data?.success) {
            message.success(response.data.responseMessage || "Category updated successfully!");
            handleCloseUpdateModal();
        } else {
            message.error(response.data?.responseMessage || "Failed to update category.");
        }
    } catch (error) {
        console.error("🔥 Lỗi API:", error);
        message.error("Failed to update category.");
    }
};

  

  const handleDelete = async (id) => {
    console.log("ID Delete: ", id);
    try {
      const response = await categoryApi.deleteCategory(id);
      console.log("📡 Phản hồi từ BE:", response);

      if (response.data?.success) {
        message.success(response.data.responseMessage || "Category deleted successfully!");
        fetchCategories();
      } else {
          message.error(response.data?.responseMessage || "Failed to update category.");
      }
    } catch (error) {
      message.error("Failed to delete category.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleOpenUpdateModal(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAddModal} style={{ marginBottom: 16, marginLeft: 16 }}>
        Add Category
      </Button>
      <Button type="primary" icon={<HomeOutlined />} onClick={() => navigate("/admin/warehouse")} style={{ marginBottom: 16, marginLeft: 16 }}>
        Warehouse
      </Button>


      <Table columns={columns} dataSource={categories} rowKey="id" loading={loading} />

      {isAddModalVisible && <AddCategoryForm visible={isAddModalVisible} onClose={handleCloseAddModal} />}

      {isUpdateModalVisible && selectedCategory && (
        <UpdateCategoryForm
          visible={isUpdateModalVisible}
          onClose={handleCloseUpdateModal}
          category={selectedCategory}
          handleUpdate={handleUpdate} // ✅ Truyền hàm cập nhật vào form
        />
      )}
    </div>
  );
};

export default CategoryList;
