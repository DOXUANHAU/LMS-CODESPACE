import React, { useContext, useEffect, useRef, useState } from "react";
import { Space, Dropdown, Button, Avatar, Col, Badge } from "antd";
import { UserOutlined, LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export const UserHeaderAuth = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const cartRef = useRef(null);

  const [cartItemsCount, setCartItemsCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.length || 0;
  });

  useEffect(() => {
    const updateCartState = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItemsCount(cart.length);
      triggerCartAnimation();
    };

    // Tạo trigger Animation cho cart icon
    const triggerCartAnimation = () => {
      if (cartRef.current) {
        cartRef.current.classList.add("cart-animate");
        setTimeout(() => {
          cartRef.current?.classList.remove("cart-animate");
        }, 700);
      }
    };

    // Lắng nghe sự kiện thay đổi localStorage
    window.addEventListener("storage", updateCartState);
    return () => window.removeEventListener("storage", updateCartState);
  }, []);

  const menuItems = [
    { key: "profile", label: "Trang cá nhân", onClick: () => navigate("/info-user") },
    { key: "orders", label: "Lịch sử Đơn hàng", onClick: () => navigate("/order-history") },
    user?.role === "Mentor" && { key: "mentor", label: "Giảng Viên", onClick: () => navigate("/mentor/dashboard") },
    user?.role === "Admin" && { key: "admin", label: "Quản trị viên", onClick: () => navigate("/admin/dashboard") },
    { key: "logout", label: "Đăng xuất", icon: <LogoutOutlined />, onClick: logout },
  ].filter(Boolean);

  return (
    <Space size={16}>
      {!user ? (
        <>
          <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
          <Button type="primary" onClick={() => navigate("/sign-up")}>Đăng ký</Button>
        </>
      ) : (
        <>
          <Col className="nav-item">
            {user?.role === "Mentor" ? (
              <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/mentor/courses")}>
                Khóa học của tôi
              </span>
            ) : (
              <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/sign-up-mentor")}>
                Tham gia giảng dạy
              </span>
            )}
          </Col>

          <Badge count={cartItemsCount} size="small" offset={[0, 4]}>
            <ShoppingCartOutlined
              ref={cartRef}
              className="cart-icon"
              onClick={() => navigate("/shopping-cart")}
            />
          </Badge>

          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ cursor: "pointer", backgroundColor: "#87d068" }}
            />
          </Dropdown>
        </>
      )}
    </Space>
  );
};
