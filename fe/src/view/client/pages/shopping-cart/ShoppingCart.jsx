import React, { useEffect, useState } from "react";
import { Layout, Typography, Row, Col, Divider } from "antd";
import { RightOutlined } from "@ant-design/icons";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import styles from "./ShoppingCart.module.css";
import CheckoutHeader from "../checkout/CheckoutHeader";
import { toast } from "react-toastify";
import { formatFeeToVND } from "../../../../utils/helper/formatFeeToVND";

const { Title, Text } = Typography;

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const handleRemove = (idToRemove) => {
    const updatedCart = cartItems.filter((item) => item.id !== idToRemove);
    setCartItems(updatedCart);
    toast.success("Đã xóa khóa học khỏi giỏ hàng!");
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    // Gửi event để các component khác (icon giỏ hàng) biết thay đổi
    window.dispatchEvent(new Event("storage"));
  };

  const calculateTotal = () => {
    const price = cartItems.reduce((sum, item) => sum + item.price, 0);
    const discount = cartItems.reduce(
      (acc, item) => acc + (item.originalPrice - item.price),
      0
    );
    const tax = Math.round(price * 0.1); // Thuế giả sử là 10%
    const total = price + tax - discount;

    return {
      price: formatFeeToVND(price),
      discount: `-${formatFeeToVND(discount)}`,
      tax: formatFeeToVND(tax),
      total: formatFeeToVND(total),
    };
  };

  const orderSummary = calculateTotal();

  return (
    <Layout.Content className={styles.shoppingCart}>
      <CheckoutHeader step={1} />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div className={styles.header}>
            <Title level={2}>Shopping Cart</Title>
            <div className={styles.breadcrumb}>
              <Text>Categories</Text>
              <RightOutlined />
              <Text>Details</Text>
              <RightOutlined />
              <Text type="primary">Shopping Cart</Text>
            </div>
          </div>

          <Text className={styles.cartCount}>{cartItems.length} khóa học trong giỏ hàng</Text>
          <Divider />

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} onRemove={() => handleRemove(item.id)} />
            ))
          ) : (
            <Text>Giỏ hàng đang trống.</Text>
          )}
        </Col>

        <Col xs={24} lg={8}>
          <OrderSummary orderSummary={orderSummary} />
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default ShoppingCart;
