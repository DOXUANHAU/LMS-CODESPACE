import { useState } from "react";
import { Input, Button, Card, message, Form } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResendEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/user/resend-confirmation", {
        email: values.email,
      });

      if (response.data.success) {
        toast.success("Email xác nhận đã được gửi lại!");
      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">Gửi lại email xác nhận</h2>
        <p className="text-gray-600 mb-4">
          Nhập email của bạn để nhận lại email xác nhận tài khoản.
        </p>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>
          <Button 

            type="primary" 
            htmlType="submit" 
            loading={loading} 
            block
            onClick={() => navigate("/success")}
          >
            Gửi lại email xác nhận
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ResendEmail;
