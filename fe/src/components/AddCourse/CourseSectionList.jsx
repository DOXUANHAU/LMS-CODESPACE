import { useState } from "react";
import { Collapse, Button, List, Badge } from "antd";
import { PlusOutlined, VideoCameraOutlined } from "@ant-design/icons";
import CourseSectionTopicItem from "./CourseSectionTopicItem";

const { Panel } = Collapse;

const CourseSectionList = ({ sections, showAddTopicModal }) => {
  return (
    <div>
      <h3>Chương học</h3>

      <Collapse accordion>
        {Array.isArray(sections) && sections.length > 0 ? (
          sections.map((section, sectionIndex) => (
            <Panel
              header={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>
                    <Badge count={section.srNo} style={{ backgroundColor: "#52c41a", marginRight: 8 }} />
                    <strong>{section.name}</strong>
                  </span>
                  <Badge count={section?.courseSectionTopics?.length || 0} showZero />
                </div>
              }
              key={sectionIndex}
            >
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                className="mb-2"
                onClick={() => showAddTopicModal(section.id)} // ✅ Truyền ID của chương
              >
                Thêm Chủ Đề
              </Button>

              <List
                dataSource={section?.courseSectionTopics || []}
                renderItem={(topic) => (
                  <CourseSectionTopicItem topic={topic} />
                )}
              />
            </Panel>
          ))
        ) : (
          <p>Chưa có chương học nào.</p>
        )}
      </Collapse>
    </div>
  );
};

export default CourseSectionList;
