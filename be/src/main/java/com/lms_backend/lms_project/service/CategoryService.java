package com.lms_backend.lms_project.service;

import com.lms_backend.lms_project.dto.request.CategoryRequestDto;
import com.lms_backend.lms_project.entity.Category;
import com.lms_backend.lms_project.entity.Course;

import java.util.List;

public interface CategoryService {
    Category addCategory(Category category);
    Category updateCategory(Category category);
    Category getCategoryById(int category);
    List<Category> getCategoriesByStatusIn(List<String> status);
    boolean existsByName(String name);
    List<Category> getAllCategoriesDeletedFalse();
    List<Category> getAllCategoriesDeletedTrue();

    List<Course> getCoursesByCategoryName(String categoryName, String status);
}
