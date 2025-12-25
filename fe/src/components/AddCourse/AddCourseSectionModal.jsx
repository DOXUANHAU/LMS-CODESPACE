import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";
import courseApi from "../../api/courseApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddCourseSectionModal = ({ visible, onClose, onSuccess, course }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields(); // Reset form khi mở modal
    }
  }, [visible, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = { 
        courseId: course?.id, 
        srNo: String(values.srNo), // 🔥 Chuyển đổi srNo thành string
        name: values.name, 
        description: values.description || "" 
      };

      const response = await courseApi.addCourseSection(payload);

      if (response?.data && typeof onSuccess === "function") {
        onSuccess(response.data); // ✅ Gửi dữ liệu để cập nhật danh sách sections
        toast.success("Chương đã được thêm thành công!");
      }

      form.resetFields();
      onClose();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm chương.");
      console.error("❌ Lỗi khi thêm chương:", error);
    }
  };

  return (
    <Modal title="Thêm Chương Mới" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="srNo" label="Số thứ tự" rules={[{ required: true, message: "Nhập số thứ tự!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Tên chương" rules={[{ required: true, message: "Nhập tên chương!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit} block>
          Thêm
        </Button>
      </Form>
    </Modal>
  );
};

export default AddCourseSectionModal;
