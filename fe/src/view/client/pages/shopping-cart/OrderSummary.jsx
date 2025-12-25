import React, { useEffect, useState } from "react";
import { Typography, Card, Button, Divider, List, Avatar, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { DollarCircleOutlined, GiftOutlined, ShoppingOutlined } from "@ant-design/icons";
import { formatFeeToVND } from "../../../../utils/helper/formatFeeToVND";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const OrderSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    price: 0,
    discount: 0,
    // tax: 0,
    total: 0,
  });

  const navigate = useNavigate();

  // Hàm tính toán tóm tắt đơn hàng
  const calculateOrderSummary = (cart) => {
    const price = cart.reduce((acc, item) => acc + item.price, 0);
    const discount = cart.reduce(
      (acc, item) => acc + (item.originalPrice - item.price),
      0
    );
    // const tax = Math.round(price * 0.1); // Thuế giả sử là 10%
    // const total = price + tax - discount;
    const total = price;

    setOrderSummary({
      price: formatFeeToVND(price),
      discount: `-${formatFeeToVND(discount)}`,
      // tax: formatFeeToVND(tax),
      total: formatFeeToVND(total),
    });
  };

  // Load cart data và tính toán tóm tắt đơn hàng mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateOrderSummary(storedCart);
  }, []); // Chạy lần đầu khi component mount

  // Lắng nghe sự thay đổi của cartItems và cập nhật lại tóm tắt đơn hàng
  useEffect(() => {
    calculateOrderSummary(cartItems);
  }, [cartItems]); // Cập nhật khi cartItems thay đổi

  const handleCheckout = () => {
    toast.success("Đơn hàng đã được xác nhận! Tiến thành thanh toán.");
    navigate("/check-out");
  };

  const handleRemove = (idToRemove) => {
    const updatedCart = cartItems.filter((item) => item.id !== idToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    // Gửi event để các component khác (icon giỏ hàng) biết thay đổi
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Card
      style={{
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        padding: 16,
      }}
    >
      <Title level={3} style={{ marginBottom: 16 }}>
        Đơn hàng của bạn
      </Title>

      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleRemove(item.id)}>
                Xóa
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar shape="square" size={64} src={item.thumbnail} />}
              title={<Text strong>{item.title}</Text>}
              description={
                <Space direction="vertical" size={0}>
                  <Text>Số lượng: 1</Text>
                  <Text>
                    Giá:{" "}
                    <Text delete>{formatFeeToVND(item.originalPrice)}</Text>{" "}
                    <Text type="danger">{formatFeeToVND(item.price)}</Text>
                  </Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />

      <Divider />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Text>
            <DollarCircleOutlined /> Tạm tính
          </Text>
          <Text strong>{orderSummary.price}</Text>
        </Space>
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Text>
            <GiftOutlined /> Giảm giá
          </Text>
          <Text strong type="danger">
            {orderSummary.discount}
          </Text>
        </Space>
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Text>
            <ShoppingOutlined /> Thuế
          </Text>
          <Text strong>{orderSummary.tax}</Text>
        </Space>

        <Divider style={{ margin: "12px 0" }} />

        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Text strong>Tổng cộng</Text>
          <Text strong style={{ fontSize: 18 }}>
            {orderSummary.total}
          </Text>
        </Space>
      </div>

      <Button
        type="primary"
        block
        size="large"
        style={{ marginTop: 20, borderRadius: 8 }}
        onClick={handleCheckout}
      >
        Tiến hành thanh toán
      </Button>
    </Card>
  );
};

export default OrderSummary;
