import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BackButton = ({ text = "Quay lại" }) => {
  const navigate = useNavigate();

  return (
    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
      {text}
    </Button>
  );
};

export default BackButton;
