package com.lms_backend.lms_project.service;

import com.lms_backend.lms_project.entity.ConfirmationToken;
import com.lms_backend.lms_project.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User addUser(User user);

    String generateToken(User user);

    User updateUser(User user);

    User getUserByEmailAndStatus(String emailId, String status);

    User getUserByEmailid(String emailId);

    List<User> getUserByRole(String role);

    User getUserById(int userId);

    User getUserByEmailIdAndRoleAndStatus(String emailId, String role, String status);

    List<User> updateAllUser(List<User> users);

    List<User> getUserByRoleAndStatus(String role, String status);

    int activeUser(String email);

    List<User> getAllMentors();
    List<User> getAllUser();
    User findByEmail(String email);
    Optional<User> verifyResetPasswordToken(String token);
}
