package com.lms_backend.lms_project.dto.response;


import java.util.ArrayList;
import java.util.List;

import com.lms_backend.lms_project.dto.CourseDTO;
import com.lms_backend.lms_project.entity.Course;
import lombok.Data;

@Data
public class CourseResponseDto extends CommonApiResponse {

    private List<Course> courses = new ArrayList<>();

    private Course course;

    private String isCoursePurchased;

    private List<CourseDTO> courseDTOs;
}
