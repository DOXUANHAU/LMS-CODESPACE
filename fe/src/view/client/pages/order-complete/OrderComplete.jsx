import React from 'react';
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Table,
  Image,
  Divider,
  message,
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './styles.css';
import { baseURL } from '../../../../api/constant';

const { Title, Text } = Typography;

const OrderCompleted = () => {
  const buyNow = JSON.parse(localStorage.getItem('buyNow')) || null;

  if (!buyNow) {
    message.error('No order data found.');
    return null;
  }

  const discountedPrice = buyNow.fee - (buyNow.fee * buyNow.discountInPercent) / 100;

  const orderDetails = {
    orderId: `#${Date.now().toString().slice(-6)}`, // Tạm thời tạo orderId ngẫu nhiên
    paymentMethod: 'Credit Card',
    totalAmount: discountedPrice,
    items: [
      {
        name: buyNow.name,
        price: discountedPrice,
        thumbnail: buyNow.thumbnail,
      },
    ],
  };

  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text) => (
        <Image
          width={80}
          src={`${baseURL}/course/${text}`}
          alt="thumbnail"
          preview={false}
        />
      ),
    },
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${(text / 1000).toFixed(3)}đ`,
    },
  ];

  return (
    <div className="order-completed">
      {/* Header */}
      <Card className="order-header" style={{ textAlign: 'center', marginBottom: 20 }}>
        <CheckCircleOutlined style={{ fontSize: '40px', color: '#28a745' }} />
        <Title level={2} style={{ marginTop: '10px' }}>Thanh toán thành công</Title>
        <Text type="secondary">Cảm ơn bạn đã mua khóa học!</Text>
      </Card>

      {/* Order Summary */}
      <Card>
        <Row gutter={16}>
          <Col span={12}>
            <Title level={4}>Tóm tắt đơn hàng</Title>
            <Table
              columns={columns}
              dataSource={orderDetails.items}
              pagination={false}
              rowKey="name"
              bordered={false}
              size="small"
            />
          </Col>

          <Col span={12}>
            <Title level={4}>Chi tiết thanh toán</Title>
            <Text>Order ID: {orderDetails.orderId}</Text>
            <Divider />
            <Text>Phương thức thanh toán: {orderDetails.paymentMethod}</Text>
            <Divider />
            <Text>
              Tổng tiền: <strong>{(orderDetails.totalAmount / 1000).toFixed(3)}đ</strong>
            </Text>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col>
            <Button
              type="primary"
              size="large"
              style={{ marginRight: '10px' }}
              onClick={() => window.location.href = '/'}
            >
              Về trang chủ
            </Button>
            <Button
              size="large"
              style={{ marginLeft: '10px' }}
              onClick={() => window.location.href = '/user/orders'}
            >
              Xem đơn hàng của bạn
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default OrderCompleted;
