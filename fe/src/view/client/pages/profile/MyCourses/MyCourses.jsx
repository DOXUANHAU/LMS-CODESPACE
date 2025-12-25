import { Card, Button, Tag, Typography, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import MyCourseCard from './MyCourseCard';
import courseApi from '../../../../../api/courseApi';
import { toast } from 'react-toastify';

const { Title } = Typography;

export default function MyCourses() {
  const [bookings, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const customerId = user.id || 0;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseApi.fetchCourseByCustomerId(customerId);
        setBooking(response.data.bookings || []);
        toast.success("Đã tải khóa học thành công");
      } catch (error) {
        toast.error("Lỗi tải khóa học: ", error.message || "Có lỗi xảy ra khi tải khóa học");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [customerId]);

//   console.log("Bookings:", bookings);
  return (
    <div className="p-8">
      <Title level={2}>Khóa học của tôi</Title>
      <Row gutter={[48, 24]}>
        {bookings.map((booking) => (
          <Col key={booking.id} xs={24} sm={12} md={8} lg={6}>
            <MyCourseCard courseBooking={booking} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
