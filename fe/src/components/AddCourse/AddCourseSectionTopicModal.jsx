import { useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import courseApi from "../../api/courseApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourseSectionTopicModal = ({ visible, onClose, sectionId }) => {
  const [form] = Form.useForm();
  const [videoList, setVideoList] = useState([]);
  const [docxList, setDocxList] = useState([]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!videoList.length) {
        toast.error("Vui lòng tải lên video!");
        return;
      }

      if (!docxList.length) {
        toast.error("Vui lòng tải lên file bài tập (DOCX)!");
        return;
      }

      const videoFile = videoList[0].originFileObj;
      const docxFile = docxList[0].originFileObj;

      // check video
      if (!videoFile.type.startsWith("video/")) {
        toast.error("File video không hợp lệ!");
        return;
      }

      // check docx
      const validDocxTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validDocxTypes.includes(docxFile.type)) {
        toast.error("Chỉ được phép tải lên file DOC hoặc DOCX!");
        return;
      }

      const formData = new FormData();
      formData.append("srNo", values.srNo);
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("sectionId", sectionId);
      formData.append("video", videoFile);
      formData.append("exerciseFile", docxFile);

      await courseApi.addCourseSectionTopic(formData);

      toast.success("Thêm chủ đề thành công!");
      form.resetFields();
      setVideoList([]);
      setDocxList([]);
      onClose();
    } catch (error) {
      console.error("❌ API lỗi:", error.response?.data || error);
      toast.error("Thêm chủ đề thất bại!");
    }
  };

  return (
    <Modal title="Thêm Chủ Đề Mới" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item label="Số thứ tự" name="srNo" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên chủ đề" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* Upload Video */}
        <Form.Item label="Tải lên video">
          <Upload
            fileList={videoList}
            beforeUpload={() => false}
            accept="video/*"
            maxCount={1}
            onChange={({ fileList }) => setVideoList(fileList)}
          >
            <Button icon={<UploadOutlined />}>Chọn video</Button>
          </Upload>
        </Form.Item>

        {/* Upload DOCX */}
        <Form.Item label="Tải file bài tập (DOCX)">
          <Upload
            fileList={docxList}
            beforeUpload={() => false}
            accept=".doc,.docx"
            maxCount={1}
            onChange={({ fileList }) => setDocxList(fileList)}
          >
            <Button icon={<UploadOutlined />}>Chọn file bài tập</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" onClick={handleSubmit} block>
          Thêm
        </Button>
      </Form>
    </Modal>
  );
};

export default AddCourseSectionTopicModal;
