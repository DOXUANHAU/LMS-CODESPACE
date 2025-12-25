import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Spin, Card, Button, Result } from "antd";
import authApi from "../../../../api/authApi";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const verify = async () => {
        try {
          const res = await authApi.verifyEmail(token);
          console.log("API Response 1:", res); 
          console.log("API Response 2:", res.success); 
          if (res.success) {
            setStatus("success");
          } else {
            setStatus("error");
          }
        } catch (error) {
          console.error("API Error:", error);
          setStatus("error");
        }
      };
      
    verify();
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="shadow-lg rounded-lg p-6 w-full max-w-md">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">Đang xác nhận email...</p>
          </div>
        )}

        {status === "success" && (
          <Result
            status="success"
            title="Xác nhận email thành công!"
            subTitle="Bạn đã xác thực tài khoản thành công, hãy đăng nhập để tiếp tục."
            extra={[
              <Button type="primary" key="login" onClick={() => navigate("/login")}>
                Đăng nhập ngay
              </Button>,
            ]}
          />
        )}

        {status === "error" && (
          <Result
            status="error"
            title="Xác nhận email thất bại!"
            subTitle="Token không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu xác nhận lại."
            extra={[
              <Button type="primary" key="resend" onClick={() => navigate("/resend-confirmation")}>
                Gửi lại email xác nhận
              </Button>,
            ]}
          />
        )}

        {status === "invalid" && (
          <Result
            status="warning"
            title="Liên kết không hợp lệ!"
            subTitle="Không tìm thấy mã xác thực. Vui lòng kiểm tra lại email của bạn."
          />
        )}
      </Card>
    </div>
  );
};

export default VerifyEmail;
