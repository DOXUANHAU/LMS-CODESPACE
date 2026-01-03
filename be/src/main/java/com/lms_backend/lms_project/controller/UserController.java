package com.lms_backend.lms_project.controller;

import com.lms_backend.lms_project.dto.request.AddMentorDetailRequestDto;
import com.lms_backend.lms_project.dto.request.ChangePasswordRequestDTO;
import com.lms_backend.lms_project.dto.request.UserLoginRequest;
import com.lms_backend.lms_project.dto.response.CommonApiResponse;
import com.lms_backend.lms_project.dto.response.RegisterUserRequestDTO;
import com.lms_backend.lms_project.dto.response.UserLoginResponse;
import com.lms_backend.lms_project.dto.response.UserResponseDTO;
import com.lms_backend.lms_project.entity.User;
import com.lms_backend.lms_project.resource.UserResource;
import com.lms_backend.lms_project.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    UserResource userResource;

    @Autowired
    UserService userService;

    @GetMapping("/fetch-all")
    public ResponseEntity<UserResponseDTO> fetchAllUser(){
        return userResource.fetchAllUser();
    }

    @PostMapping("/login")
    @Operation(summary = "Api to login any User")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
        return userResource.login(userLoginRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<CommonApiResponse> register(@RequestBody RegisterUserRequestDTO request){
        return userResource.registerUser(request);
    }
    @GetMapping("/forget-password")
    @Operation(summary = "Api to login any User")
    public ResponseEntity<CommonApiResponse> forgetPassword(@RequestParam String email) {
        return userResource.forgetPassword(email);
    }

    @PutMapping("/reset-password")
    @Operation(summary = "Api to reset password")
    public ResponseEntity<CommonApiResponse> resetPassword(@RequestBody ChangePasswordRequestDTO request) {
        return userResource.resetPassword(request);
    }

    @PutMapping("/change-password")
    @Operation(summary = "Api to change password")
    public ResponseEntity<CommonApiResponse> changePassword(@RequestBody ChangePasswordRequestDTO request) {
        return userResource.changePassword(request);
    }

    @GetMapping(path = "/confirm")
    public ResponseEntity<CommonApiResponse> confirm(@RequestParam("token") String token) {
        return userResource.confirmToken(token);
    }

    @GetMapping("/verify-reset-token")
    public ResponseEntity<?> verifyResetToken(@RequestParam("token") String token) {
        Optional<User> userOpt = userService.verifyResetPasswordToken(token);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token không hợp lệ hoặc đã hết hạn.");
        }

        User user = userOpt.get();

        return ResponseEntity.ok(Map.of(
                "email", user.getEmailId(),
                "username", user.getUsername()
        ));
    }

    @GetMapping(path = "/resend-confirmation")
    public ResponseEntity<CommonApiResponse> resendConfirm(@RequestParam("token") String email) {
        return userResource.resendConfirmToken(email);
    }

    @GetMapping(value = "/{userImageName}", produces = "image/*")
    public void fetchTourImage(@PathVariable("userImageName") String userImageName, HttpServletResponse resp) {
        this.userResource.fetchUserImage(userImageName, resp);
    }

    @GetMapping(value = "/users")
    public  ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUser();
        return ResponseEntity.ok(users);
    }

    @GetMapping(value = "/mentor/mentors")
    public ResponseEntity<List<User>> getMentors() {
        List<User> mentors = userService.getAllMentors();
        return ResponseEntity.ok(mentors);
    }

    @PutMapping("/mentor/detail/update")
    @Operation(summary = "Api to update the mentor detail")
    public ResponseEntity<CommonApiResponse> addMentorDetail(AddMentorDetailRequestDto addMentorDetailRequestDto) {
        return this.userResource.addMentorDetail(addMentorDetailRequestDto);
    }

//    @GetMapping(value = "/{userImgAvartar}", produces = "image/*")
//    public void fetchTourAvatar(@PathVariable("userImgAvartar") String userImgAvartar, HttpServletResponse resp) {
//        this.userResource.fetchUserImage(userImgAvartar, resp);
//    }

    @PostMapping("/{id}/upload-avatar")
    public ResponseEntity<CommonApiResponse> uploadAvatar(
            @PathVariable int id,
            @RequestParam("avatar") MultipartFile file) {

        CommonApiResponse response = new CommonApiResponse();

        if (file.isEmpty()) {
            response.setResponseMessage("File is empty.");
            response.setSuccess(false);
            return ResponseEntity.badRequest().body(response);
        }

        try {
            userResource.updateUserAvatar(id, file);
            response.setResponseMessage("Avatar updated successfully");
            response.setSuccess(true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.setResponseMessage("Error saving avatar: " + e.getMessage());
            response.setSuccess(false);
            return ResponseEntity.status(500).body(response);
        }
    }



}
