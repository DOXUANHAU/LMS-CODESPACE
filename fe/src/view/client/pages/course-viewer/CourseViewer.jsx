import React, { useState } from 'react';
import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import CourseSection from './CourseSection';
import CourseDetail from './CourseDetail';
import CourseRelative from './CourseRelative';
import { useLocation } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player';
import courseApi from '../../../../api/courseApi';

const { Content } = Layout;
const { Title, Text } = Typography;

const CourseViewer = () => {
  const location = useLocation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTopicName, setSelectedTopicName] = useState("");
  const [progress, setProgress] = useState(0);
  const booking = location.state ? location.state : null;
  const course = booking.courseBooking.course || [];

  console.log("CourseViewer", booking.courseBooking.course);
  
  return (
    <Layout className="course-viewer">
      <Content className="course-content">
      <Title level={2} className="course-title" style={{ color: "#1890ff", fontWeight: "bold" }}>
        Khóa học: {course.name}
      </Title>
        {/* Sử dụng Row và Col để chia layout */}
        <Row gutter={[20, 20]}>
          {/* Cột Video */}
          <Col xs={24} md={16}>
            <div className="video-player">
              {selectedVideo ? (
                <>
                  <ReactPlayer
                    url={selectedVideo}
                    controls
                    width="100%"
                    height="650px"
                    onProgress={({ played }) => {
                      const percent = Math.floor(played * 100);
                      setProgress(percent);
                    
                      const user = JSON.parse(localStorage.getItem("user"));
                    
                      if (user?.id) {
                        if (percent === 100) {
                          // Nếu video xem 100% => báo đã hoàn thành topic này
                          courseApi.markVideoCompleted(user.id, selectedTopicName)
                            .then(() => console.log(`✅ Hoàn thành topic ${selectedTopicName}`))
                            .catch(err => console.error("❌ Lỗi báo hoàn thành:", err));
                        } else if (percent % 10 === 0) {
                          // Cứ mỗi 10% thì update tiến độ
                          courseApi.updateVideoProgress(user.id, selectedTopicName, percent)
                            .then(() => console.log(`✅ Đã gửi ${percent}% cho topic ${selectedTopicName}`))
                            .catch(err => console.error("❌ Lỗi gửi tiến độ:", err));
                        }
                      }
                    }}
                  />
                  <p style={{ marginTop: 8, textAlign: "right" }}>Đã xem: {progress}%</p>
                </>
              ) : (
                <>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f649cbe18fe999fa6d048972936d6c31fe727e177978293d799656d85d16b0f"
                    alt="Course video"
                    className="video-background"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/32961767e8b9bec5c4b4601ef945693be0f3cbaa941a27dbda2fac0376ea946d"
                    alt="Play button"
                    className="play-button"
                  />
                </>
              )}
            </div>
            <CourseDetail course={course} />
          </Col>

          {/* Cột Course Progress */}
          <Col xs={24} md={8}>
            <Card className="progress-card">
              <Title level={3} className="progress-title">Nội dung khóa học</Title>
              {/* Section Information */}
              {course.sections.length === 0 ? (
                <div
                  style={{
                    marginTop: 24,
                    padding: "16px",
                    background: "#f7f7f7",
                    borderRadius: 8,
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <ExclamationCircleOutlined style={{ fontSize: 24, color: "#ff9900", marginBottom: 8 }} />
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    Khóa học này chưa có phần học. Vui lòng quay lại sau khi khóa học được cập nhật.
                  </Text>
                </div>
              ) : (
                <div style={{ marginTop: 24 }}>
                  {course.sections.map((section, index) => (
                    <CourseSection key={index} section={section} onSelectVideo={(videoUrl, topicId) => {
                      setSelectedVideo(videoUrl);
                      setSelectedTopicName(topicId);  // Lưu ID topic để update tiến độ
                    }} />
                  ))}
                </div>
              )}
            </Card>
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          {/* <CourseRelative title="More Courses by Ronald Richards" /> */}
        </Row>
      </Content>
    </Layout>
  );
};

export default CourseViewer;
