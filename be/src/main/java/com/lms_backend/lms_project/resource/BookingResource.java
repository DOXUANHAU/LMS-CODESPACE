package com.lms_backend.lms_project.resource;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.lms_backend.lms_project.Utility.Constant;
import com.lms_backend.lms_project.Utility.Helper;
import com.lms_backend.lms_project.Utility.OtpStore;
import com.lms_backend.lms_project.dao.BookingDAO;
import com.lms_backend.lms_project.dao.CourseDao;
import com.lms_backend.lms_project.dto.UserDTO;
import com.lms_backend.lms_project.dto.request.BookingFreeRequestDTO;
import com.lms_backend.lms_project.dto.request.BookingRequestDTO;
import com.lms_backend.lms_project.dto.response.BookingResponseDTO;
import com.lms_backend.lms_project.dto.response.CommonApiResponse;
import com.lms_backend.lms_project.entity.*;
import com.lms_backend.lms_project.exception.ResourceNotFoundException;
import com.lms_backend.lms_project.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

@Component
public class BookingResource {

    private final Logger LOG = LoggerFactory.getLogger(BookingResource.class);

    @Autowired
    private BookingService bookingService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;


    @Autowired
    EmailService emailService;
    @Autowired
    private CourseDao courseDao;
    @Autowired
    private BookingDAO bookingDAO;

    public ResponseEntity<CommonApiResponse> addBooking(BookingRequestDTO request) {
        LOG.info("Request received for adding customer booking course: {}", request);  // Log yêu cầu chi tiết

        CommonApiResponse response = new CommonApiResponse();
        String bookingTime = String.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

        String storedOtp = OtpStore.getOtp(userService.getUserById(request.getCustomerId()).getEmailId());
        if (storedOtp == null || !storedOtp.equals(request.getOtpConfirm())) {
            response.setResponseMessage("OTP is invalid or expired");
            response.setSuccess(false);
            LOG.error("OTP validation failed for email: {}", userService.getUserById(request.getCustomerId()).getEmailId());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        OtpStore.clearOtp(userService.getUserById(request.getCustomerId()).getEmailId());

        // Kiểm tra các trường hợp thiếu dữ liệu
        if (request == null || request.getCourseIds() == null || request.getCourseIds().isEmpty()
                || request.getCustomerId() == 0 || request.getCvv() == null || request.getExpiryDate() == null
                || request.getNameOnCard() == null || request.getCardNo() == null || request.getAmount() == null) {
            response.setResponseMessage("Missing input or invalid details");
            response.setSuccess(false);
            LOG.error("Invalid input data: {}", request);  // Log lỗi khi thiếu thông tin
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Lấy thông tin customer
        User customer = this.userService.getUserById(request.getCustomerId());
        if (customer == null) {
            response.setResponseMessage("Customer not found!");
            response.setSuccess(false);
            LOG.error("Customer not found for ID: {}", request.getCustomerId());  // Log lỗi khi không tìm thấy customer
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        BigDecimal totalAmount = BigDecimal.ZERO;

        // Kiểm tra các khóa học và tính tổng số tiền
        for (Integer courseId : request.getCourseIds()) {
            Course course = this.courseService.getById(courseId);
            BigDecimal discountPercent = new BigDecimal(course.getDiscountInPercent()).divide(new BigDecimal(100), 4, RoundingMode.HALF_UP);
            if (course == null) {
                response.setResponseMessage("Course with ID " + courseId + " not found!");
                response.setSuccess(false);
                LOG.error("Course not found for ID: {}", courseId);  // Log lỗi khi không tìm thấy course
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Kiểm tra khóa học đã được mua chưa
            List<Booking> existingBookings = this.bookingService.getByCourseAndCustomer(course, customer);
            if (!CollectionUtils.isEmpty(existingBookings)) {
                response.setResponseMessage("Course with ID " + courseId + " has already been purchased!");
                response.setSuccess(false);
                LOG.error("Course with ID {} already purchased by customer with ID {}", courseId, request.getCustomerId());  // Log khi khóa học đã được mua
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Tính học phí sau khi áp dụng chiết khấu
            BigDecimal feeWithDiscount = course.getFee().multiply(BigDecimal.ONE.subtract(discountPercent));

            // Cộng học phí đã giảm vào tổng tiền
            totalAmount = totalAmount.add(feeWithDiscount);
        }

        // Kiểm tra và chuyển đổi số tiền từ chuỗi sang BigDecimal
        BigDecimal requestedAmount;
        try {
            requestedAmount = new BigDecimal(String.valueOf(request.getAmount())).setScale(2, RoundingMode.HALF_UP);
        } catch (NumberFormatException e) {
            response.setResponseMessage("Invalid amount format");
            response.setSuccess(false);
            LOG.error("Invalid amount format: {}", request.getAmount());  // Log khi số tiền không hợp lệ
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra tổng số tiền yêu cầu có khớp với tổng số tiền tính toán
        if (totalAmount.compareTo(requestedAmount) != 0) {
            response.setResponseMessage("Total amount mismatch. Please check your payment details.");
            response.setSuccess(false);
            LOG.error("Amount mismatch: calculated = {}, requested = {}", totalAmount, requestedAmount);  // Log khi tổng số tiền không khớp
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Tiến hành thanh toán và booking
        for (Integer courseId : request.getCourseIds()) {
            Course course = this.courseService.getById(courseId);

            // Calculate fee original
            BigDecimal fee = course.getFee();
            BigDecimal discountPercent = BigDecimal.valueOf(course.getDiscountInPercent());
            BigDecimal discountAmount = fee.multiply(discountPercent).divide(BigDecimal.valueOf(100));
            BigDecimal feeOriginal = fee.subtract(discountAmount);

            String bookingId = Helper.generateTourBookingId();
            String paymentBookingId = Helper.generateBookingPaymentId();

            Payment payment = new Payment();
            payment.setCardNo(request.getCardNo());
            payment.setBookingId(bookingId);
            payment.setAmount(feeOriginal);
            payment.setCustomer(customer);
            payment.setCvv(request.getCvv());
            payment.setExpiryDate(request.getExpiryDate());
            payment.setNameOnCard(request.getNameOnCard());
            payment.setPaymentId(paymentBookingId);

            // Lưu payment
            Payment savedPayment = this.paymentService.addPayment(payment);
            if (savedPayment == null) {
                response.setResponseMessage("Failed to process payment for course with ID " + courseId);
                response.setSuccess(false);
                LOG.error("Failed to process payment for course ID: {}", courseId);  // Log khi thanh toán không thành công
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // Cập nhật số tiền cho mentor
            User mentor = course.getMentor();
            mentor.setAmount(mentor.getAmount().add(course.getFee()));
            this.userService.updateUser(mentor);

            // Tạo booking
            Booking booking = new Booking();
            booking.setOtpConfirm(storedOtp);
            booking.setBookingId(bookingId);
            booking.setDiscountInPercent(course.getDiscountInPercent());
            booking.setPayment(savedPayment);
            booking.setAmount(course.getFee());
            booking.setBookingTime(bookingTime);
            booking.setCustomer(customer);
            booking.setCourse(course);
            booking.setStatus(Constant.BookingStatus.CONFIRMED.value());

            // Cập nhật số học viên của khóa học
            course.setQuantityStudent(course.getQuantityStudent() + 1);

            // Cập nhật tổng số học viên của mentor
            List<Course> courseRelative = courseService.getByMentorAndStatus(mentor, "Active");
            int totalStudent = 0;
            for (Course c : courseRelative) {
                totalStudent += c.getQuantityStudent();
            }
            mentor.getMentorDetail().setQuantityStudent(totalStudent);

            // Lưu booking
            Booking savedBooking = this.bookingService.addBooking(booking);
            if (savedBooking == null) {
                response.setResponseMessage("Failed to book course with ID " + courseId);
                response.setSuccess(false);
                LOG.error("Failed to create booking for course ID: {}", courseId);  // Log khi tạo booking không thành công
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // Trả về phản hồi thành công
        response.setResponseMessage("Congratulations! All courses purchased successfully!");
        response.setSuccess(true);
        LOG.info("Booking successful for customer ID: {}", request.getCustomerId());  // Log khi booking thành công
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<BookingResponseDTO> fetchAllBookings() {

        BookingResponseDTO response = new BookingResponseDTO();

        List<Booking> bookings = this.bookingService.getAllBookings();

        if (CollectionUtils.isEmpty(bookings)) {
            response.setResponseMessage("No Course Purchases found!!");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.BAD_REQUEST);
        }

        response.setBookings(bookings);
        response.setResponseMessage("Fetched all Course Purchases!!!");
        response.setSuccess(true);

        return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.OK);
    }

    public ResponseEntity<BookingResponseDTO> fetchAllBookingsByCourse(Integer courseId) {

        BookingResponseDTO response = new BookingResponseDTO();

        if (courseId == null) {
            response.setResponseMessage("missing input");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.BAD_REQUEST);

        }

        Course course = this.courseService.getById(courseId);

        if (course == null) {
            response.setResponseMessage("course not found!!!");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.BAD_REQUEST);
        }

        List<Booking> bookings = this.bookingService.getByCourse(course);

        if (CollectionUtils.isEmpty(bookings)) {
            response.setResponseMessage("No Course Purchases found!!");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.OK);
        }

        response.setBookings(bookings);
        response.setResponseMessage("Fetched all Course Purchases!!!");
        response.setSuccess(true);

        return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.OK);
    }

    public ResponseEntity<BookingResponseDTO> fetchAllBookingsByCustomer(Integer customerId) {

        BookingResponseDTO response = new BookingResponseDTO();

        if (customerId == null) {
            response.setResponseMessage("missing input");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.BAD_REQUEST);

        }

        User customer = this.userService.getUserById(customerId);

        if (customer == null) {
            response.setResponseMessage("customer not found!!!");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.BAD_REQUEST);
        }

        List<Booking> bookings = this.bookingService.getBookingByCustomer(customer);

        if (CollectionUtils.isEmpty(bookings)) {
            response.setResponseMessage("No Course Purchases found");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.OK);
        }

        response.setBookings(bookings);
        response.setResponseMessage("Fetched Course Purchases!!");
        response.setSuccess(true);

        return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.OK);
    }

    public ResponseEntity<BookingResponseDTO> fetchAllBookingsByMentorId(Integer mentorId) {

        BookingResponseDTO response = new BookingResponseDTO();

        if (mentorId == null) {
            response.setResponseMessage("missing input");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.BAD_REQUEST);

        }

        User mentor = this.userService.getUserById(mentorId);

        if (mentor == null) {
            response.setResponseMessage("mentor not found!!!");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.BAD_REQUEST);
        }

        List<Booking> bookings = this.bookingService.getByMentor(mentor);

        if (CollectionUtils.isEmpty(bookings)) {
            response.setResponseMessage("No Course Purchases found");
            response.setSuccess(false);

            return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.OK);
        }

        response.setBookings(bookings);
        response.setResponseMessage("Fetched all Course Purchases!!");
        response.setSuccess(true);

        return new ResponseEntity<BookingResponseDTO>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> bookFreeCourse(BookingFreeRequestDTO request) {
        LOG.info("📩 Received request to book FREE course: {}", request);

        CommonApiResponse response = new CommonApiResponse();

        // 1. Validate input
        if (request == null || request.getCourseId() == 0 || request.getCustomerId() == 0) {
            LOG.warn("❌ Invalid request: missing courseId or customerId");
            response.setResponseMessage("Thiếu thông tin khóa học hoặc người dùng");
            response.setSuccess(false);
            return ResponseEntity.badRequest().body(response);
        }

        // 2. Validate course
        Course course = courseService.getById(request.getCourseId());
        if (course == null) {
            LOG.warn("❌ Course not found with ID: {}", request.getCourseId());
            response.setResponseMessage("Không tìm thấy khóa học");
            response.setSuccess(false);
            return ResponseEntity.badRequest().body(response);
        }

        if (course.getFee().compareTo(BigDecimal.ZERO) > 0) {
            LOG.warn("❌ Attempted to book a paid course as free. Course ID: {}", course.getId());
            response.setResponseMessage("Khóa học này không miễn phí");
            response.setSuccess(false);
            return ResponseEntity.badRequest().body(response);
        }

        // 3. Validate user
        User customer = userService.getUserById(request.getCustomerId());
        if (customer == null) {
            LOG.warn("❌ Customer not found with ID: {}", request.getCustomerId());
            response.setResponseMessage("Không tìm thấy người dùng");
            response.setSuccess(false);
            return ResponseEntity.badRequest().body(response);
        }

        // 4. Check for duplicate booking
        List<Booking> existingBookings = bookingService.getByCourseAndCustomer(course, customer);
        if (!CollectionUtils.isEmpty(existingBookings)) {
            LOG.warn("❌ Duplicate booking attempt. Customer {} already booked Course {}", customer.getId(), course.getId());
            response.setResponseMessage("Bạn đã đăng ký khoá học này rồi");
            response.setSuccess(false);
            return ResponseEntity.badRequest().body(response);
        }

        // 5. Create booking
        Booking booking = new Booking();
        booking.setBookingId(Helper.generateTourBookingId());
        booking.setCourse(course);
        booking.setCustomer(customer);
        booking.setStatus(Constant.BookingStatus.CONFIRMED.value());
        booking.setBookingTime(String.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()));
        booking.setAmount(BigDecimal.ZERO); // Miễn phí

        Booking savedBooking = bookingService.addBooking(booking);
        if (savedBooking == null) {
            LOG.error("❌ Failed to save booking for customer {} and course {}", customer.getId(), course.getId());
            response.setResponseMessage("Đăng ký khóa học thất bại");
            response.setSuccess(false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

        // 6. Success
        LOG.info("✅ Successfully enrolled customer {} to course {}", customer.getId(), course.getId());
        response.setResponseMessage("Đăng ký khoá học miễn phí thành công!");
        response.setSuccess(true);
        return ResponseEntity.ok(response);
    }

    public List<UserDTO> getStudentsByCourseAndMentor(int mentorId, int courseId) {
        // 1. Kiểm tra mentor có phải là người hướng dẫn của khóa học không
        Course course = courseDao.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khóa học với ID: " + courseId));

        if (course.getMentor() == null || course.getMentor().getId() != mentorId) {
            throw new AccessDeniedException("Mentor không phải người hướng dẫn của khóa học này");
        }

        // 2. Lấy danh sách booking theo courseId và status là "confirmed"
        List<Booking> confirmedBookings = bookingDAO.findStudentsByCourseAndMentor(courseId, mentorId);

        // 3. Chuyển đổi sang DTO
        return confirmedBookings.stream()
                .map(Booking::getCustomer)
                .distinct()
                .map(this::convertToUserDTO)
                .filter(userDTO -> userDTO.getFirstName() != null || userDTO.getLastName() != null) // Lọc các đối tượng không có tên
                .collect(Collectors.toList());
    }

    private UserDTO convertToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .emailId(user.getEmailId())
                .phoneNo(user.getPhoneNo())
                .avatar(user.getAvatar())
                .build();
    }

    public List<User> fetchStudentByCourse(int courseId) {
        LOG.info("Request list student by course ID: " + courseId);

        if (courseId == 0) {
            LOG.warn("Course ID is missing or invalid");
            return Collections.emptyList();  // trả về danh sách rỗng thay vì ResponseEntity
        }

        List<User> studentsByCourse = bookingService.fetchStudentsByCourse(courseId);

        if (studentsByCourse == null) {
            return Collections.emptyList();
        }

        return studentsByCourse;
    }



}

