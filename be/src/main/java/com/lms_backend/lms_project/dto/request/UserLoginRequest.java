package com.lms_backend.lms_project.dto.request;

import lombok.Data;

@Data
public class UserLoginRequest {

    private String emailId;

    private String password;

    private String role;

}

