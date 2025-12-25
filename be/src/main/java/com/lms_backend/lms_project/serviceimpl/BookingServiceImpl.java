package com.lms_backend.lms_project.serviceimpl;

import com.lms_backend.lms_project.dao.BookingDAO;
import com.lms_backend.lms_project.entity.Booking;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.User;
import com.lms_backend.lms_project.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingDAO bookingDAO;

    @Override
    public Booking addBooking(Booking booking) {
        // TODO Auto-generated method stub
        return bookingDAO.save(booking);
    }

    @Override
    public Booking updateBooking(Booking booking) {
        // TODO Auto-generated method stub
        return bookingDAO.save(booking);
    }

    @Override
    public Booking getById(int bookingId) {
        Optional<Booking> optionalBooking = bookingDAO.findById(bookingId);

        if (optionalBooking.isPresent()) {
            return optionalBooking.get();
        } else {
            return null;
        }

    }

    @Override
    public Booking findByBookingId(String bookingId) {
        // TODO Auto-generated method stub
        return this.bookingDAO.findByBookingId(bookingId);
    }

    @Override
    public List<Booking> getBookingByCustomer(User customer) {
        // TODO Auto-generated method stub
        return bookingDAO.findByCustomerOrderByIdDesc(customer);
    }

    @Override
    public List<Booking> getByMentor(User mentor) {
        // TODO Auto-generated method stub
        return bookingDAO.findAllBookingsByMentorOrderByIdDesc(mentor);
    }

    @Override
    public List<Booking> getByCourse(Course course) {
        // TODO Auto-generated method stub
        return bookingDAO.findByCourseOrderByIdDesc(course);
    }

    @Override
    public List<Booking> getAllBookings() {
        // TODO Auto-generated method stub
        return bookingDAO.findAll();
    }

    @Override
    public List<Booking> getByCourseAndCustomer(Course course, User customer) {
        // TODO Auto-generated method stub
        return bookingDAO.findByCourseAndCustomer(course, customer);
    }

    @Override
    public List<User> fetchStudentsByCourse(int courseId) {
        return bookingDAO.findStudentsByCourseId(courseId);
    }

}
