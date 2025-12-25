import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import authApi from "../../../../api/authApi";
import { toast } from "react-toastify";

const SignupForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // 🟢 1. Gửi request đăng ký đến backend
      const userData = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        role: "Student",
        password: values.password, // Tạm thời gửi password cho BE xử lý
      };
  
      const response = await authApi.register(userData);
      
      if (response.success) {
        toast.success("Đăng ký thành công !");
        // setTimeout(() => navigate("/login"), 1000);
        setTimeout(() => toast.success("Đã gửi mã xác nhận đến email, xác nhận Email để đăng nhập !"), 1500)
      } else {
        toast.error(response.responseMessage || "Đăng ký thất bại. Kiểm tra thông tin!");
      }
    } catch (error) {
      toast.error(`Lỗi đăng ký: ${error.response?.data?.message || error.message}`);
      console.error("❌ Lỗi đăng ký:", error);
    }
  };
  

  return (
    <div className="signup-form-container">
      <h1 className="signup-title">Create Your Account</h1>

      <Form
        form={form}
        name="signup"
        onFinish={onFinish}
        layout="vertical"
        className="signup-form"
      >
        <Row gutter={30}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Email ID" />
        </Form.Item>

        <Row gutter={30}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter Password" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="create-account-btn"
          >
            Create Account
            <ArrowRightOutlined />
          </Button>
        </Form.Item>
      </Form>

      <div className="signup-divider">
        <span className="divider-line"></span>
        <span className="divider-text">Sign up with</span>
        <span className="divider-line"></span>
      </div>

      <SocialLogin />
    </div>
  );
};

export default SignupForm;
