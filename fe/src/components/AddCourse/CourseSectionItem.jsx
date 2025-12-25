import { Collapse, Badge, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CourseSectionTopicList from "./CourseSectionTopicList";

const { Panel } = Collapse;

const CourseSectionItem = ({ section, showAddTopicModal }) => {
  console.log("section", section);
  
  return (
    <Panel
      header={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>
            <Badge count={section.srNo} style={{ backgroundColor: "#52c41a", marginRight: 8 }} />
            <strong>{section.name}</strong>
          </span>
          <Badge count={section.courseSectionTopics.length} showZero />
        </div>
      }
      key={section.id}
    >
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        className="mb-2"
        onClick={() => showAddTopicModal(section.id)}
      >
        Thêm Chủ Đề
      </Button>

      <CourseSectionTopicList topics={section.courseSectionTopics} />
    </Panel>
  );
};

export default CourseSectionItem;
