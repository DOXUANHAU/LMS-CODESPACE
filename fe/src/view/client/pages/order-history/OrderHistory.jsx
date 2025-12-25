import React, { useEffect, useState } from 'react';
import { Card, Table, Typography, Tag, Avatar, Space, Tooltip, Divider } from 'antd';
import courseApi from '../../../../api/courseApi';
import moment from 'moment';
import { baseURL } from '../../../../api/constant';

const { Title, Text } = Typography;

const statusColors = {
  pending: 'orange',
  confirmed: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const OrderHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await courseApi.getOrderHistory(user.id);
        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    {
      title: 'Khóa học',
      key: 'course',
      render: (_, record) => {
        const course = record.course;
        const mentor = course.mentor;
        const level = course.level || 'Chưa xác định';  // Cấp độ khóa học (nếu có)
    
        return (
          <Space>
            <Avatar shape="square" size={64} src={course.thumbnail && `${baseURL}/course/${course.thumbnail}`} />
            <div>
              <Text strong>{course.name}</Text>
              <div className="text-sm text-gray-500">Giảng viên: <strong>{mentor?.firstName} {mentor?.lastName}</strong></div>
              <div className="text-sm text-gray-400">Cấp độ: {level || "Mọi cấp độ"}</div>
            </div>
          </Space>
        );
      }
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'bookingTime',
      key: 'bookingTime',
      render: (value) => {
        const formattedDate = moment(Number(value)).format('DD/MM/YYYY HH:mm');
        const timeAgo = moment(Number(value)).fromNow();
    
        return (
          <Tooltip title={formattedDate}>
            <div>
              <Text>{formattedDate}</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>{timeAgo}</Text>
            </div>
          </Tooltip>
        );
      }
    },
    {
      title: 'Thanh toán',
      key: 'amount',
      render: (_, record) => {
        const price = record.amount;
        const discount = record.discountInPercent;
        const discountedPrice = price * (1 - (discount / 100));
        return (
          <div>
            {discount > 0 ? (
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Giá gốc: <Text delete>{Number(price).toLocaleString()}₫</Text>
                </Text>
                <br />
                <Text strong style={{ color: '#16a34a', fontSize: 15 }}>
                  Giá sau giảm: {Number(discountedPrice).toLocaleString()}₫
                </Text>
                <br />
                <Text type="warning" style={{ fontSize: 12 }}>
                  Đã giảm {discount}% 
                </Text>
              </div>
            ) : (
              <Text strong style={{ fontSize: 15 }}>
                {Number(price).toLocaleString()}₫
              </Text>
            )}
          </div>
        );
      }
    },
    {
      title: 'Thanh toán bằng',
      key: 'payment',
      render: (_, record) => {
        const payment = record.payment || {};
        const cardNumber = payment.cardNo || 'Ẩn';
        const cardType = payment.cardNo?.startsWith('4') ? 'Visa' : payment.cardNo?.startsWith('5') ? 'MasterCard' : 'Khác';
        const last4Digits = cardNumber.slice(-4);
    
        return (
          <div>
            <Tooltip title={`Số thẻ: ${cardNumber}`}>
              <Space direction="vertical">
                <Text>{payment.nameOnCard || '---'}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>{cardType}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>Số thẻ cuối: **** **** **** {last4Digits}</Text>
              </Space>
            </Tooltip>
          </div>
        );
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status?.toLowerCase()] || 'default'} style={{ fontSize: 14, padding: '4px 12px' }}>
          {status}
        </Tag>
      )
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="shadow-xl rounded-2xl p-4">
        <Title level={3}>Lịch Sử Đặt Hàng</Title>
        <Divider />
        <Table
          columns={columns}
          dataSource={bookings}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          bordered
          size="middle"
        />
      </Card>
    </div>
  );
};

export default OrderHistory;
