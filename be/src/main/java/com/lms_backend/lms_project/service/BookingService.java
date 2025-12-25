package com.lms_backend.lms_project.service;

import com.lms_backend.lms_project.entity.Booking;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.User;

import java.util.List;

public interface BookingService {
    Booking addBooking(Booking booking);

    Booking updateBooking(Booking booking);

    Booking getById(int bookingId);

    Booking findByBookingId(String bookingId);

    List<Booking> getBookingByCustomer(User customer);

    List<Booking> getByMentor(User mentor);

    List<Booking> getByCourse(Course course);

    List<Booking> getAllBookings();

    List<Booking> getByCourseAndCustomer(Course course, User customer);
    List<User> fetchStudentsByCourse(int courseId);

}
