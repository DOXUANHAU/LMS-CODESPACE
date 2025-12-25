import React from "react";
import { Card, Typography, Rate, Divider, Image } from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import styles from "./ShoppingCart.module.css";
import { formatFeeToVND } from "../../../../utils/helper/formatFeeToVND";

const { Text, Title } = Typography;

const CartItem = ({ key, item, onRemove }) => {
  return (
    <Card key={key} className={styles.cartItem} bodyStyle={{ padding: 16, borderRadius: 12 }}>
      <div className={styles.cartItemContent}>
        <div className={styles.itemDetails}>
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={140}
            height={100}
            style={{ borderRadius: 8, objectFit: "cover" }}
            preview={false}
          />
          <div className={styles.courseInfo}>
            <Title level={5} style={{ marginBottom: 4 }}>{item.title}</Title>
            <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
              {item.mentorName || "Instructor"}
            </Text>

            <div className={styles.ratingContainer} style={{ marginBottom: 4 }}>
              <Rate disabled allowHalf defaultValue={5} style={{ fontSize: 14 }} />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                ({item.totalRatings || 0} đánh giá)
              </Text>
            </div>

            <Text style={{ fontSize: 13 }}>
              {item.duration} • {item.lectures} • {item.level}
            </Text>

            <div className={styles.actions} style={{ marginTop: 8 }}>
              <Text className={styles.actionLink} style={{ color: "#1677ff", cursor: "pointer" }}>
                <HeartOutlined /> Lưu lại sau
              </Text>
              <Divider type="vertical" />
              <Text
                className={styles.actionLink}
                style={{ color: "#e53935", cursor: "pointer" }}
                onClick={() => onRemove(item.id)}
              >
                <DeleteOutlined /> Xóa
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.price} style={{ textAlign: "right" }}>
          <Text strong style={{ fontSize: 16, color: "#fa541c" }}>{formatFeeToVND(item.price)}</Text>
          {item.originalPrice && item.originalPrice !== item.price && (
            <Text delete type="secondary" style={{ display: "block", fontSize: 13 }}>
              {formatFeeToVND(item.originalPrice)}
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
