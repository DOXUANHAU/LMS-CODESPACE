package com.lms_backend.lms_project.dto.request;

import lombok.Data;

@Data
public class ChangePasswordRequestDTO {
    private int userId;
    private String newPassword;
    private String oldPassword;
    private String token;
}

