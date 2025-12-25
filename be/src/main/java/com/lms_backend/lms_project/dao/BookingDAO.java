package com.lms_backend.lms_project.dao;

import com.lms_backend.lms_project.entity.Booking;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.Payment;
import com.lms_backend.lms_project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface BookingDAO  extends JpaRepository<Booking, Integer> {
    Booking findByBookingId(String bookingId);

    List<Booking> findByCustomerOrderByIdDesc(User customer);

    @Query("SELECT b FROM Booking b WHERE b.course.mentor = :mentor")
    List<Booking> findAllBookingsByMentorOrderByIdDesc(@Param("mentor") User mentor);

    @Query("SELECT sum(amount) FROM Booking b WHERE b.course.mentor = :mentor")
    BigDecimal findSumOfAmountFromMentorBooking(@Param("mentor") User mentor);


    @Query("SELECT count(b) FROM Booking b WHERE b.course.mentor = :mentor")
    Long findBookingCountFromMentorBooking(@Param("mentor") User mentor);

    List<Booking> findByCourseOrderByIdDesc(Course course);

    List<Booking> findByCourseAndCustomer(Course course, User customer);

//    List<Booking> findByCourseIdAndStatus(int courseId, String status);

    @Query("SELECT b FROM Booking b WHERE b.course.id = :courseId AND b.course.mentor.id = :mentorId AND b.status = 'Confirmed'")
    List<Booking> findStudentsByCourseAndMentor(@Param("courseId") int courseId, @Param("mentorId") int mentorId);

    @Query("SELECT b.customer FROM Booking b WHERE b.course.id = :courseId AND b.status = 'Confirmed'")
    List<User> findStudentsByCourseId(@Param("courseId") Integer courseId);


}

