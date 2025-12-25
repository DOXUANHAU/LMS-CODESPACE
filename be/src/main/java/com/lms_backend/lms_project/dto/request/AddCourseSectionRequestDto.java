package com.lms_backend.lms_project.dto.request;


import lombok.Data;

@Data
public class AddCourseSectionRequestDto {

    private int courseId;

    private String srNo;

    private String name;

    private String description;

}

