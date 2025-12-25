import React from "react";
import { Avatar, Button, Menu, Divider } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import "./ProfileSidebar.css";
import { baseURL } from "../../../../../api/constant";

function ProfileSidebar({ setSelectedMenu }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <div className="profile-sidebar">
      <div className="profile-info">
        <Avatar
          size={160}
          src={`${baseURL}/user/${user.avatar}`}
          className="profile-avatar"
        />
        <h2 className="profile-name">{`${user.firstName} ${user.lastName} `}</h2>
        <Button className="share-button" icon={<ShareAltOutlined />}>
          Share Profile
        </Button>
      </div>

      <Divider className="profile-divider" />

      <Menu
        className="profile-menu"
        mode="vertical"
        onClick={(e) => setSelectedMenu(e.key)}
        items={[
          {
            key: "profile",
            label: "Profile",
            className: "menu-item-profile",
          },
          {
            key: "courses",
            label: "My Courses",
            className: "menu-item",
          },
          {
            key: "teachers",
            label: "Teachers",
            className: "menu-item",
          },
          {
            key: "message",
            label: "Message",
            className: "menu-item",
          },
          {
            key: "reviews",
            label: "My Reviews",
            className: "menu-item-last",
          },
        ]}
      />
    </div>
  );
}

export default ProfileSidebar;