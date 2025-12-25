import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Success = ({ title, subTitle, buttonText, buttonLink }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Result
        status="success"
        title={title || "Thành công!"}
        subTitle={subTitle || "Nhiệm vụ đã được hoàn thành thành công."}
        extra={
          buttonText && buttonLink ? (
            <Button type="primary" onClick={() => navigate(buttonLink)}>
              {buttonText}
            </Button>
          ) : null
        }
      />
    </div>
  );
};

export default Success;