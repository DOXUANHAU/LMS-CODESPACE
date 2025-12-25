import React, { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { addDocument } from "../../../../../firebase/services";
import { AuthContext, AppContext } from "../../../../../context/AuthProvider";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();


  const handleOk = () => {
    if (!user) {
      console.error("User not found!");
      return;
    }

    const newRoom = { ...form.getFieldsValue(), members: [user?.uid] };
    console.log("Dữ liệu phòng mới:", newRoom);
    
    // Thêm phòng mới vào Firestore
    addDocument("rooms", newRoom)
    .then(() => {
      console.log("Thêm phòng thành công!");
      form.resetFields();
      setIsAddRoomVisible(false);
    })
    .catch((error) => {
      console.error("Lỗi khi thêm phòng:", error);
    });

    // Reset form
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <Modal
      title="Tạo phòng"
      open={isAddRoomVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: !user }} // Disable OK nếu user null
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên phòng"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}
        >
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
