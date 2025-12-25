package com.lms_backend.lms_project.dto.response;

import com.lms_backend.lms_project.entity.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserRequestDTO {
    private String username;

    private String firstName;

    private String lastName;

    private String emailId;

    private String password;

    private String phoneNo;

    private String role;

    private String street;

    private String city;

    private LocalDateTime createdAt;

    private LocalDateTime updateAt;

    private LocalDateTime deletedAt;

    private String oauth2_id;

    private String oauth2_provider;

    public static User toUserEntity(RegisterUserRequestDTO request) {
        User user = new User();
        BeanUtils.copyProperties(request, user);
        return user;
    }

}

