import React, { useState, useContext } from "react";
import { Upload, Button, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./ImageUpload.css";
import { baseURL } from "../../../../../../api/constant";
import userApi from "../../../../../../api/userApi";
import { AuthContext } from "../../../../../../context/AuthProvider";

function ImageUpload({ user }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);

  const handleUpload = async () => {
    if (!selectedProfile) {
      message.warning("Vui lòng chọn một ảnh.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedProfile);

    try {
      setLoading(true);
      const response = await userApi.uploadAvatar(user.id, formData);

      if (response.success && response.avatar) {
        message.success("Ảnh đại diện đã được cập nhật.");

        // Cập nhật localStorage + context
        const updatedUser = { ...user, avatar: response.avatar };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        if (setUser) setUser(updatedUser);

        // Reset preview
        setPreviewUrl(null);
        setSelectedProfile(null);
      } else {
        message.error("Upload thất bại.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Đã xảy ra lỗi khi upload.");
    } finally {
      setLoading(false);
    }
  };

  const handleBeforeUpload = (file) => {
    setSelectedProfile(file);
    setPreviewUrl(baseURL.createObjectURL(file));
    return false;
  };

  return (
    <div className="image-upload-container">
      <h3 className="section-title">Image Preview</h3>

      <div className="image-preview-box">
        <img
          src={
            previewUrl
              ? previewUrl
              : `${baseURL}/user/${user.avatar}`
          }
          alt="Avatar"
          className="placeholder-icon"
        />
      </div>

      <h3 className="section-title upload-title">Add/Change Image</h3>

      <Form layout="vertical">
        <Form.Item label="Ảnh đại diện">
          <Upload
            beforeUpload={handleBeforeUpload}
            maxCount={1}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Button
          type="primary"
          className="save-button"
          onClick={handleUpload}
          loading={loading}
        >
          Save Image
        </Button>
      </Form>
    </div>
  );
}

export default ImageUpload;
