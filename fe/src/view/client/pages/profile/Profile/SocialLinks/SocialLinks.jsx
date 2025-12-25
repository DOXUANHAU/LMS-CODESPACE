import React from "react";
import { Form, Input } from "antd";
import "./SocialLinks.css";

function SocialLinks() {
  return (
    <div className="social-links-container">
      <h3 className="links-title">Links</h3>

      <Form layout="vertical" className="links-form">
        <Form.Item label="Website" name="website">
          <Input placeholder="Label" className="link-input" />
        </Form.Item>

        <Form.Item label="X(Formerly twitter)" name="twitter">
          <Input placeholder="Label" className="link-input" />
        </Form.Item>

        <Form.Item label="Linkdin" name="linkedin">
          <Input placeholder="Label" className="link-input" />
        </Form.Item>

        <Form.Item label="Youtube" name="youtube">
          <Input placeholder="Label" className="link-input" />
        </Form.Item>

        <Form.Item label="Facebook" name="facebook">
          <Input placeholder="Label" className="link-input" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default SocialLinks;
