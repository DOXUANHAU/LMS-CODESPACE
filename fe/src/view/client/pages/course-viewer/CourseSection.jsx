import React, { useState } from "react";
import { Typography, Button, Card, Modal, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { baseURL } from "../../../../api/constant";
import { toast } from "react-toastify";

const { Text, Title } = Typography;

const CourseSection = ({ section, onSelectVideo }) => {
  const [gradingResult, setGradingResult] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingTopicId, setLoadingTopicId] = useState(null);

  const handleSubmitEssay = async (event, topicId) => {
    toast.info("Model LLM đang xử lý, vui lòng chờ...");
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("topicId", topicId);

    try {
      setLoadingTopicId(topicId);

      const res = await fetch(`${baseURL}/grade`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Grading failed");
      }

      const result = await res.json();
      setGradingResult(result);
      setModalOpen(true);

    } catch (error) {
      console.error(error);
      Modal.error({
        title: "❌ Lỗi",
        content: "Nộp bài thất bại, vui lòng thử lại.",
      });
    } finally {
      setLoadingTopicId(null);
    }
  };

  return (
    <div
      className="course-section"
      style={{
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* ===== HEADER ===== */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/20859c0e308d06795e5a8c8624e8c8452f2d8eb67a2e5d85b1900aa7823e2ea2"
          alt="section"
          style={{
            width: 50,
            height: 50,
            marginRight: 16,
            borderRadius: "50%",
          }}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {section.name}
        </Text>
      </div>

      {/* ===== TOPICS ===== */}
      {section.courseSectionTopics.length > 0 ? (
        section.courseSectionTopics.map((topic) => (
          <Card key={topic.id} style={{ marginBottom: 16 }}>
            <Title level={4}>{topic.name}</Title>
            <Text>{topic.description}</Text>

            <div style={{ marginTop: 12 }}>
              {/* Video */}
              <Button
                type="primary"
                onClick={() =>
                  onSelectVideo(
                    `${baseURL}/course/video/${topic.videoFileName}`,
                    topic.id
                  )
                }
              >
                Xem Video
              </Button>

              {/* Download */}
              <a
                href={`${baseURL}/course/excercies/${topic.documentFileName}`}
                download
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Download bài tập
                </Button>
              </a>

              {/* Upload */}
              <input
                type="file"
                accept=".docx"
                id={`upload-${topic.id}`}
                hidden
                onChange={(e) => handleSubmitEssay(e, topic.id)}
              />

              <Button
                style={{ marginLeft: 8 }}
                loading={loadingTopicId === topic.id}
                onClick={() =>
                  document.getElementById(`upload-${topic.id}`).click()
                }
              >
                Nộp bài tập
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            background: "#f7f7f7",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <ExclamationCircleOutlined
            style={{ fontSize: 24, color: "#ff9900" }}
          />
          <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
            Khóa học này chưa có phần học.
          </Text>
        </div>
      )}

      {/* ===== RESULT MODAL ===== */}
      <Modal
        title="📊 Kết quả chấm bài"
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        okText="Đóng"
        width={480}
      >
        {gradingResult ? (
          <>
            <p>📘 <b>Nội dung:</b> {gradingResult.content}/4</p>
            <p>🧱 <b>Cấu trúc:</b> {gradingResult.structure}/2</p>
            <p>✍️ <b>Ngữ pháp:</b> {gradingResult.grammar}/2</p>
            <p>🧠 <b>Lập luận:</b> {gradingResult.argument}/2</p>

            <hr />

            <p style={{ fontSize: 16 }}>
              🎯 <b>Tổng điểm:</b>{" "}
              <span style={{ color: "#1890ff" }}>
                {gradingResult.total}/10
              </span>
            </p>

            <p>💬 <i>{gradingResult.comment}</i></p>
          </>
        ) : (
          <Spin />
        )}
      </Modal>
    </div>
  );
};

export default CourseSection;
