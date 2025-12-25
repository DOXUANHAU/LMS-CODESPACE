package com.lms_backend.lms_project.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.lms_backend.lms_project.entity.Category;
import lombok.Data;

@Data
public class CategoryResponseDto extends CommonApiResponse {

    private List<Category> categories = new ArrayList<>();

}
