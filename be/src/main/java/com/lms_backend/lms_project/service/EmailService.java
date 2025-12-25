package com.lms_backend.lms_project.service;

public interface EmailService {
    void send(String to, String email);
    void sendOtpEmail(String email, String otp);
}
