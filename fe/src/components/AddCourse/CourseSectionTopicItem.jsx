import { List, Button, Modal } from "antd";
import { VideoCameraOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { baseURL } from "../../api/constant";
import ReactPlayer from "react-player";
import courseApi from "../../api/courseApi";

const CourseSectionTopicItem = ({ topic }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoUrl = `${baseURL}/course/video/${topic.videoFileName}`;

  const user = JSON.parse(localStorage.getItem("user"));

  const handleProgress = async ({ played }) => {
    const percent = Math.floor(played * 100);
    setProgress(percent);

    // Chỉ gửi mỗi 10% hoặc 100%
    if ((percent % 10 === 0 || percent === 100) && topic.id && user?.id) {
      try {
        await courseApi.updateVideoProgress(user.id, topic.id, percent);
        console.log(`✅ Đã gửi ${percent}% lên server`);
      } catch (err) {
        console.error("❌ Gửi tiến trình thất bại:", err);
      }
    }
  };

  return (
    <List.Item
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <VideoCameraOutlined style={{ marginRight: 8 }} />
        {topic.srNo}. {topic.name}
      </div>

      <Button
        type="link"
        icon={<PlayCircleOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Xem video
      </Button>

      <Modal
        open={isModalOpen}
        title={topic.name}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <ReactPlayer
          url={videoUrl}
          controls
          width="100%"
          height="450px"
          onProgress={handleProgress}
        />
        <p style={{ marginTop: 8, textAlign: "right" }}>
          Đã xem: {progress}%
        </p>
      </Modal>
    </List.Item>
  );
};

export default CourseSectionTopicItem;
