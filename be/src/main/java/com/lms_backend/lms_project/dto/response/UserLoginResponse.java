package com.lms_backend.lms_project.dto.response;

import com.lms_backend.lms_project.dto.UserDTO;
import lombok.Data;

@Data
public class UserLoginResponse extends CommonApiResponse {

    private UserDTO user;

    private String jwtToken;

}
