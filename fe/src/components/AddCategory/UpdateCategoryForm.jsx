import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import categoryApi from "../../api/categoryApi"; // Import API

const { Option } = Select;

const UpdateCategoryForm = ({ visible, onClose, category, handleUpdate }) => {
  const [form] = Form.useForm(); // Sử dụng Form của Ant Design

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
        status: category.status || "ACTIVE",
      });
    }
  }, [category, form]);


  return (
    <Modal title="Update Course Category" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item label="Category Title" name="name" rules={[{ required: true, message: "Please enter category title" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Category Description" name="description" rules={[{ required: true, message: "Please enter description" }]}>
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Category Status" name="status">
          <Select>
            <Option value="Active">ACTIVE</Option>
            <Option value="Deactivated">DEACTIVATED</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryForm;
