package com.lms_backend.lms_project.controller;

import com.lms_backend.lms_project.Utility.Helper;
import com.lms_backend.lms_project.Utility.JwtUtils;
import com.lms_backend.lms_project.Utility.OtpStore;
import com.lms_backend.lms_project.dto.UserDTO;
import com.lms_backend.lms_project.dto.request.BookingFreeRequestDTO;
import com.lms_backend.lms_project.dto.request.BookingRequestDTO;
import com.lms_backend.lms_project.dto.response.BookingResponseDTO;
import com.lms_backend.lms_project.dto.response.CommonApiResponse;
import com.lms_backend.lms_project.dto.response.CourseResponseDto;
import com.lms_backend.lms_project.entity.User;
import com.lms_backend.lms_project.resource.BookingResource;
import com.lms_backend.lms_project.resource.CourseResource;
import com.lms_backend.lms_project.service.EmailService;
import com.lms_backend.lms_project.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("api/booking")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final Logger LOG = LoggerFactory.getLogger(BookingResource.class);

    @Autowired
    private BookingResource bookingResource;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CourseResource courseResource;

    @PostMapping("add")
    public ResponseEntity<CommonApiResponse> addEvent(@RequestBody BookingRequestDTO request) {
        System.out.println("Received booking request: " + request);
        return this.bookingResource.addBooking(request);
    }
    @PostMapping("add-free")
    public ResponseEntity<CommonApiResponse> bookFreeCourse(@RequestBody BookingFreeRequestDTO request) {
        return this.bookingResource.bookFreeCourse(request);
    }

    @GetMapping("fetch/all")
    public ResponseEntity<BookingResponseDTO> fetchAllBookings() {
        return this.bookingResource.fetchAllBookings();
    }

    @GetMapping("fetch/course-wise")
    public ResponseEntity<BookingResponseDTO> fetchAllBookingsByCourse(@RequestParam("courseId") Integer courseId) {
        return this.bookingResource.fetchAllBookingsByCourse(courseId);
    }

    @GetMapping("fetch/customer-wise")
    public ResponseEntity<BookingResponseDTO> fetchAllBookingsByCustomer(
            @RequestParam("customerId") Integer customerId) {
        return this.bookingResource.fetchAllBookingsByCustomer(customerId);
    }

    @GetMapping("fetch/mentor-wise")
    public ResponseEntity<BookingResponseDTO> fetchAllBookingsByMentorId(
            @RequestParam("mentorId") Integer mentorId) {
        return this.bookingResource.fetchAllBookingsByMentorId(mentorId);
    }

    @GetMapping("/send-otp")
    public ResponseEntity<CommonApiResponse> sendOtpToEmail(@RequestParam("email") String email) {
        CommonApiResponse response = new CommonApiResponse();
        try {
            String otp = Helper.generateOtp();
            emailService.sendOtpEmail(email, otp);

            // Lưu vào OTP store
            OtpStore.saveOtp(email, otp);

            response.setResponseMessage("OTP đã được gửi tới email.");
            response.setSuccess(true);
        } catch (Exception e) {
            response.setResponseMessage("Error while sending OTP: " + e.getMessage());
            response.setSuccess(false);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/fetch/course-user-id")
    @Operation(summary = "Api to fetch course by using course id and student id")
    public ResponseEntity<CourseResponseDto> fetchCourseById(@RequestParam("courseId") Integer courseId,
                                                             @RequestParam("userId") Integer userId) {
        return courseResource.fetchCourseByIdAndUserId(courseId, userId);
    }

    @GetMapping("/students/{mentorId}/{courseId}")
    public ResponseEntity<List<UserDTO>> getStudentsByCourseAndMentor(
            @PathVariable int mentorId,
            @PathVariable int courseId) {

        List<UserDTO> students = bookingResource.getStudentsByCourseAndMentor(mentorId, courseId);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/fetch/student-by-course/{courseId}")
    @Operation(summary = "Api to fetch courses by using name")
    public List<User> fetchStudentByCourse(@PathVariable("courseId") int courseId) {
        return bookingResource.fetchStudentByCourse(courseId);
    }
}

