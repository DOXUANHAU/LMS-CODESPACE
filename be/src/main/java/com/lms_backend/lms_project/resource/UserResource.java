package com.lms_backend.lms_project.resource;

import com.lms_backend.lms_project.Utility.Constant;
import com.lms_backend.lms_project.Utility.JwtUtils;
import com.lms_backend.lms_project.dao.UserDAO;
import com.lms_backend.lms_project.dto.UserDTO;
import com.lms_backend.lms_project.dto.request.AddMentorDetailRequestDto;
import com.lms_backend.lms_project.dto.request.ChangePasswordRequestDTO;
import com.lms_backend.lms_project.dto.request.UserLoginRequest;
import com.lms_backend.lms_project.dto.response.*;
import com.lms_backend.lms_project.entity.Category;
import com.lms_backend.lms_project.entity.ConfirmationToken;
import com.lms_backend.lms_project.entity.MentorDetail;
import com.lms_backend.lms_project.entity.User;
import com.lms_backend.lms_project.exception.UserSaveFailedException;
import com.lms_backend.lms_project.service.EmailService;
import com.lms_backend.lms_project.service.MentorDetailService;
import com.lms_backend.lms_project.service.StorageService;
import com.lms_backend.lms_project.service.UserService;
import com.lms_backend.lms_project.serviceimpl.ConfirmationTokenService;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
@Transactional
public class UserResource {
    private final Logger LOG = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private StorageService storageService;

    @Autowired
    private MentorDetailService mentorDetailService;

    @Autowired
    private JwtUtils jwtUtils;

    public ResponseEntity<UserResponseDTO> fetchAllUser() {
        LOG.info("Request received for fetching all users");

        UserResponseDTO response = new UserResponseDTO();

        List<User> users = this.userService.getAllUser();

        if (CollectionUtils.isEmpty(users)) {
            response.setResponseMessage("No user found");
            response.setSuccess(false);

            return new ResponseEntity<UserResponseDTO>(response, HttpStatus.OK);
        }

        response.setUsers(users);
        response.setResponseMessage("User fetched successful");
        response.setSuccess(true);

        return new ResponseEntity<UserResponseDTO>(response, HttpStatus.OK);

    }

    public ResponseEntity<UserLoginResponse> login(UserLoginRequest loginRequest) {

        LOG.info("Received request for User Login");

        UserLoginResponse response = new UserLoginResponse();

        if (loginRequest == null) {
            response.setResponseMessage("Missing Input");
            response.setSuccess(false);

            return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
        }

        String jwtToken = null;
        User user = null;

        user = this.userService.getUserByEmailid(loginRequest.getEmailId());

        if (user == null) {
            response.setResponseMessage("User with this Email Id not registered in System!!!");
            response.setSuccess(false);

            return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
        }

        List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(user.getRole()));

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmailId(),
                    loginRequest.getPassword(), authorities));
        } catch (Exception ex) {
            response.setResponseMessage("Invalid email or password.");
            response.setSuccess(false);
            return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
        }

        jwtToken = jwtUtils.generateToken(loginRequest.getEmailId());

        if (!user.getStatus().equals(Constant.ActiveStatus.ACTIVE.value())) {
            response.setResponseMessage("User is not active");
            response.setSuccess(false);
            return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
        }

        UserDTO userDTO = UserDTO.toUserDtoEntity(user);

        // user is authenticated
        if (jwtToken != null) {
            response.setUser(userDTO);
            response.setResponseMessage("Logged in sucessful");
            response.setSuccess(true);
            response.setJwtToken(jwtToken);
            user.setFirebaseUid(response.getUser().getFirebaseUid());
            return new ResponseEntity<UserLoginResponse>(response, HttpStatus.OK);
        }

        else {
            response.setResponseMessage("Failed to login");
            response.setSuccess(false);
            return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
        }

    }

    public ResponseEntity<CommonApiResponse> registerUser(RegisterUserRequestDTO request) {

        LOG.info("Request received for Register User");

        CommonApiResponse response = new CommonApiResponse();

        if (request == null) {
            response.setResponseMessage("user is null");
            response.setSuccess(false);

            return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
        }

        if (request.getEmailId() == null || request.getPassword() == null) {
            response.setResponseMessage("missing input");
            response.setSuccess(false);

            return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
        }

        // User existed and actived.
        User existingUser = this.userService.getUserByEmailAndStatus(request.getEmailId(), Constant.ActiveStatus.ACTIVE.value());

        if (existingUser != null) {
            response.setResponseMessage("User adready register with this Email");
            response.setSuccess(false);

            return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
        }

        if (request.getRole() == null) {
            response.setResponseMessage("bad request ,Role is missing");
            response.setSuccess(false);

            return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
        }

        // User existed but deactived.
        User userDeactive = this.userService.getUserByEmailAndStatus(request.getEmailId(), Constant.ActiveStatus.DEACTIVATED.value());
        if (userDeactive != null) {
            response.setResponseMessage("Please Confirm Email to active account to login");
            response.setSuccess(false);
        }


        // Register User Input Form
        User user = RegisterUserRequestDTO.toUserEntity(request);
        LocalDateTime now = LocalDateTime.now();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setAmount(BigDecimal.ZERO);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(Constant.ActiveStatus.DEACTIVATED.value());
        user.setCreatedAt(now);
        user.setRole(Constant.UserRole.ROLE_STUDENT.value());
        User userActive = userService.addUser(user);

        String token = userService.generateToken(user);
        String frontendUrl = "http://localhost:5173/verify-email?token=" + token;
        emailService.send(
                user.getEmailId(),
                buildEmail(user.getUsername(), frontendUrl));

        if (userActive == null) {
            throw new UserSaveFailedException("Registration Failed because of Technical issue:(");
        }

        response.setResponseMessage("User registered Successfully");
        response.setSuccess(true);

        return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> addMentorDetail(AddMentorDetailRequestDto request) {
        LOG.info("Received request for adding the mentor detail");

        CommonApiResponse response = new CommonApiResponse();

        // Kiểm tra request đầu vào
        if (request == null || request.getMentorId() == 0) {
            response.setResponseMessage("Missing request body or mentor ID");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Tìm User theo ID
        User user = userService.getUserById(request.getMentorId());

        // Kiểm tra user có tồn tại và đã được kích hoạt chưa
        if (user == null) {
            response.setResponseMessage("User not found.");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        if (!user.getStatus().equals(Constant.ActiveStatus.ACTIVE.value())) {
            response.setResponseMessage("User is not active. Please verify email first.");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        LOG.info("User found and active. Updating MentorDetail...");

        // Cập nhật thông tin Mentor
        MentorDetail mentorDetail = AddMentorDetailRequestDto.toEntity(request);
        mentorDetail.setProfilePic(storageService.store(request.getProfilePic()));
        mentorDetail.setSelectedCertificate(storageService.store(request.getSelectedCertificate()));

        MentorDetail updatedMentorDetail = mentorDetailService.addMentorDetail(mentorDetail);
        user.setMentorDetail(updatedMentorDetail);
        user.setRole(Constant.UserRole.ROLE_MENTOR.value());

        userService.updateUser(user);

        response.setResponseMessage("Mentor profile updated successfully!");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    private String buildEmail(String username, String link) {
        return "<div style=\"font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6;\">"
                + "<h2 style=\"color: #1a73e8;\">Chào " + username + ",</h2>"
                + "<p>Cảm ơn bạn đã đăng ký tài khoản tại hệ thống của chúng tôi.</p>"
                + "<p>Vui lòng xác nhận email của bạn bằng cách nhấp vào nút bên dưới:</p>"
                + "<p style=\"text-align: center;\">"
                + "<a href=\"" + link + "\" style=\"display: inline-block; padding: 12px 24px; color: #fff; background-color: #1a73e8; text-decoration: none; border-radius: 5px; font-weight: bold;\">Xác nhận email</a>"
                + "</p>"
                + "<p>Nếu bạn không thực hiện đăng ký này, vui lòng bỏ qua email này.</p>"
                + "<p>Trân trọng,<br><strong>Đội ngũ hỗ trợ LMS</strong></p>"
                + "</div>";
    }

    public ResponseEntity<CommonApiResponse> confirmToken(String token) {
        LOG.info("Confirm mail");

        CommonApiResponse response = new CommonApiResponse();

        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        userService.activeUser(
                confirmationToken.getUser().getEmailId());

        response.setResponseMessage("Confirm Email Successfully, token is: " + token);
        response.setSuccess(true);

        return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> resendConfirmToken(String email) {
        LOG.info("Resending confirmation email for: " + email);

        CommonApiResponse response = new CommonApiResponse();
        User user = userService.getUserByEmailAndStatus(email, Constant.ActiveStatus.DEACTIVATED.value());

        if (user == null) {
            response.setResponseMessage("Email không tồn tại hoặc đã được xác nhận.");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        String token = userService.generateToken(user);
        String frontendUrl = "http://localhost:5173/verify-email?token=" + token;

        emailService.send(user.getEmailId(), buildEmail(user.getUsername(), frontendUrl));

        response.setResponseMessage("Email xác nhận đã được gửi lại.");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public void fetchUserImage(String userImageName, HttpServletResponse resp) {
        Resource resource = storageService.load(userImageName);
        if (resource != null) {
            try (InputStream in = resource.getInputStream()) {
                ServletOutputStream out = resp.getOutputStream();
                FileCopyUtils.copy(in, out);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void updateUserAvatar(int userId, MultipartFile avatarFile) {
        LOG.info("Check file avatar: " + avatarFile);
        if (avatarFile == null || avatarFile.isEmpty()) {
            throw new IllegalArgumentException("Avatar file must not be empty");
        }

        User user = userDAO.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Kiểm tra loại file (tùy chọn)
        if (!avatarFile.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed.");
        }

        // Xóa file cũ nếu tồn tại
        if (user.getAvatar() != null && !user.getAvatar().isBlank()) {
            storageService.delete(user.getAvatar());
        }

        // Lưu file mới
        String savedFileName = storageService.store(avatarFile);

        // Cập nhật user
        user.setAvatar(savedFileName);
        userDAO.save(user);
    }


    public ResponseEntity<CommonApiResponse> forgetPassword(String email) {
        LOG.info("🔒 Received request for password reset for email: {}", email);

        CommonApiResponse response = new CommonApiResponse();

        if (email == null || email.trim().isEmpty()) {
            response.setResponseMessage("Email is required.");
            response.setSuccess(false);
            return ResponseEntity.badRequest().body(response);
        }

        User user = userService.findByEmail(email);
        if (user == null) {
            response.setResponseMessage("No user found with this email.");
            response.setSuccess(false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Generate reset token (JWT or UUID)
        String token = userService.generateToken(user);
        String resetUrl = "http://localhost:5173/reset-password?token=" + token;

        // Send email
        emailService.send(
                user.getEmailId(),
                buildMailResetPassword(user.getUsername(), resetUrl)
        );

        response.setResponseMessage("Password reset email has been sent. Please check your inbox.");
        response.setSuccess(true);
        return ResponseEntity.ok(response);
    }

    private String buildMailResetPassword(String username, String link) {
        return "<div style=\"font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6;\">"
                + "<h2 style=\"color: #1a73e8;\">Chào " + username + ",</h2>"
                + "<p>Vui lòng xác nhận đổi mật khẩu bằng cách nhấn vào nút bên dưới:</p>"
                + "<p style=\"text-align: center;\">"
                + "<a href=\"" + link + "\" style=\"display: inline-block; padding: 12px 24px; color: #fff; background-color: #1a73e8; text-decoration: none; border-radius: 5px; font-weight: bold;\">Xác nhận email</a>"
                + "</p>"
                + "<p>Trân trọng,<br><strong>Đội ngũ hỗ trợ LMS</strong></p>"
                + "</div>";
    }

    public ResponseEntity<CommonApiResponse> resetPassword(ChangePasswordRequestDTO request) {
        CommonApiResponse response = new CommonApiResponse();

        Optional<User> userOpt = userService.verifyResetPasswordToken(request.getToken());

        if (userOpt.isEmpty()) {
            response.setSuccess(false);
            response.setResponseMessage("Token không hợp lệ hoặc đã hết hạn.");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        User user = userOpt.get();

        // Encode mật khẩu mới
        String encodedPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedPassword);

        // Lưu lại người dùng
        userService.addUser(user);

        // (Tùy chọn) Cập nhật thời gian xác nhận token
        confirmationTokenService.setConfirmedAt(request.getToken());

        response.setSuccess(true);
        response.setResponseMessage("Mật khẩu đã được thay đổi thành công.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> changePassword(ChangePasswordRequestDTO request) {
        CommonApiResponse response = new CommonApiResponse();

        User user = userService.getUserById(request.getUserId());

        if (user == null) {
            response.setSuccess(false);
            response.setResponseMessage("User is not existing");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            response.setSuccess(false);
            response.setResponseMessage("Mật khẩu không chính xác");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Encode mật khẩu mới
        String encodedPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedPassword);

        // Lưu lại người dùng
        userService.addUser(user);

        response.setSuccess(true);
        response.setResponseMessage("Mật khẩu đã được thay đổi thành công.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
