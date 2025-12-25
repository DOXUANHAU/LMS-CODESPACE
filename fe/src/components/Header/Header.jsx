import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { HeaderSearch } from "./HeaderSearch";
import { UserHeaderAuth } from "./UserHeaderAuth";
import "./styles.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
  const navigate = useNavigate();

  // Lắng nghe sự thay đổi trong localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("jwtToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Layout.Header className="site-header">
      <Row className="header-container" align="middle" justify="space-between" wrap={false}>
        <Col className="logo-section" onClick={() => navigate("/home")}>
          <Space size={16} className="logo-clickable">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e02fb6c9a7eecac5c023060dfa3e98a94c7cbb6ce9c3a4b435fa8f0383a8586d"
              alt="Giant Wisdom Logo"
              className="logo-image"
            />
            <span className="logo-text">Giant<br />Wisdom</span>
          </Space>
        </Col>

        <Col className="nav-item" onClick={() => navigate("/categories")}>
          <span>Danh sách khóa học</span>
        </Col>

        <Col flex="none" style={{ width: "800px" }}>
          <HeaderSearch />
        </Col>

        <Col>
          {/* {isLoggedIn ? <UserHeaderAuth /> : <HeaderAuth />} */}
          <UserHeaderAuth /> 
        </Col>
      </Row>
      <div className="header-divider" />
    </Layout.Header>
  );
};

export default Header;
