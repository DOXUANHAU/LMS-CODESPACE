import React from "react";
import { Form, Input, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./ProfileForm.css";

const { TextArea } = Input;
const { Option } = Select;

function ProfileForm({ user }) {
  // const formData = new FormData();
  // formData.append("firstName", selectedProfile);
  // formData.append("lastName", selectedProfile);
  // formData.append("headline", selectedProfile);
  // formData.append("firstName", selectedProfile);
  // formData.append("firstName", selectedProfile);

  console.log("User in ProfileForm", user);
  
  return (
    <div className="profile-form-container">
      <Form
        layout="vertical"
        className="profile-form"
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          headline: user.headline,
          jobTitle: user?.mentorDetail?.profession,
          description: user?.mentorDetail?.bio,
          language: "vietnamese",
        }}
      >
        <div className="name-row">
          <Form.Item
            label="First Name"
            name="firstName"
            className="form-item-half"
          >
            <Input placeholder="First Name" className="form-input" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            className="form-item-half"
          >
            <Input placeholder="Last Name" className="form-input" />
          </Form.Item>
        </div>

        {/* <Form.Item label="Headline" name="headline">
          <Input placeholder="Headline" className="form-input" />
        </Form.Item> */}

        <Form.Item
          label="Job Title"
          name="jobTitle"
          className="form-item-job-title"
        >
          <Input
            placeholder="Job Title"
            className="form-input"
            disabled={!(user.role === "Mentor" || user.role === "Admin")}
          />
        </Form.Item>

        {user.role === "Mentor" && (
          <Form.Item label="Description" name="description">
            <TextArea
              placeholder="Bio"
              className="form-textarea"
              rows={4}
            />
          </Form.Item>
        )}

        {/* <Form.Item label="Language" name="language">
          <Select
            placeholder="Select language"
            className="form-select"
            suffixIcon={<DownOutlined />}
          >
            <Option value="vietnamese">Vietnamese</Option>
            <Option value="english">English</Option>
            <Option value="spanish">Spanish</Option>
            <Option value="french">French</Option>
          </Select>
        </Form.Item> */}
      </Form>
    </div>
  );
}

export default ProfileForm;
