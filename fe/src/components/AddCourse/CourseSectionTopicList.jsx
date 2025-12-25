import { List } from "antd";
import CourseSectionTopicItem from "./CourseSectionTopicItem";

const CourseSectionTopicList = ({ topics }) => {
  return (
    <List
      dataSource={topics}
      renderItem={(topic) => <CourseSectionTopicItem topic={topic} />}
    />
  );
};

export default CourseSectionTopicList;
