package com.lms_backend.lms_project.dto.response;

import com.lms_backend.lms_project.entity.Category;
import com.lms_backend.lms_project.entity.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserResponseDTO extends CommonApiResponse {
    private List<User> users = new ArrayList<>();
}
