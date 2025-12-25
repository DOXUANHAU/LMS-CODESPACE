import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import categoryApi from "../../api/categoryApi"; // Import API

const { Option } = Select;

const AddCategoryForm = ({ visible, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("DEACTIVATED"); // State lưu trạng thái
  const [loading, setLoading] = useState(false); // Trạng thái loading khi gọi API

  const saveCategory = async () => {
    if (!name || !description) {
      message.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await categoryApi.addCategory({ name, description, status });

      console.log("Infomation Category add success:", response);

      if (response.data?.success) {
        message.success(response.data.responseMessage || "Category added successfully!");

        setTimeout(() => {
          setName("");
          setDescription("");
          setStatus(status); // Reset trạng thái về ACTIVE
          onClose();
        }, 500); // Chờ 500ms trước khi đóng modal
      } else {
        message.error(response.data?.responseMessage || "Failed to add category.");
      }
    } catch (error) {
      message.error("Error occurred while adding category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Add Course Category" open={visible} onCancel={onClose} footer={null}>
      <Form layout="vertical" onFinish={saveCategory}>
        <Form.Item label="Category Title" required>
          <Input placeholder="Enter title.." value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        
        <Form.Item label="Category Description" required>
          <Input.TextArea rows={3} placeholder="Enter description.." value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        {/* Dropdown chọn trạng thái */}
        <Form.Item label="Category Status" required>
          <Select value={status} onChange={setStatus}>
            <Option value="ACTIVE">ACTIVE</Option>
            <Option value="DEACTIVE">DEACTIVE</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {loading ? "Adding..." : "Add Course Category"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryForm;
