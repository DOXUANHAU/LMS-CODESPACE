package com.lms_backend.lms_project.serviceimpl;


import java.util.List;
import java.util.Optional;

import com.lms_backend.lms_project.dao.CategoryDao;
import com.lms_backend.lms_project.dao.CourseDao;
import com.lms_backend.lms_project.dto.request.CategoryRequestDto;
import com.lms_backend.lms_project.entity.Category;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private CourseDao courseDao;

    @Override
    public Category addCategory(Category category) {
        return this.categoryDao.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryDao.save(category);
    }

    @Override
    public Category getCategoryById(int categoryId) {

        Optional<Category> optionalCategory = this.categoryDao.findById(categoryId);

        if (optionalCategory.isPresent()) {
            return optionalCategory.get();
        } else {
            return null;
        }

    }

    @Override
    public List<Category> getCategoriesByStatusIn(List<String> status) {
        return this.categoryDao.findByStatusIn(status);
    }

    @Override
    public boolean existsByName(String name) {
        return this.categoryDao.existsByName(name);
    }

    @Override
    public List<Category> getAllCategoriesDeletedFalse() {
        return this.categoryDao.findByDeletedFalse();
    }
    @Override
    public List<Category> getAllCategoriesDeletedTrue() {
        return this.categoryDao.findByDeletedTrue();
    }

    @Override
    public List<Course> getCoursesByCategoryName(String categoryName, String status) {
        return courseDao.findByCategory_NameContainingIgnoreCaseAndStatusOrderByIdDesc(categoryName, status);
    }
}

