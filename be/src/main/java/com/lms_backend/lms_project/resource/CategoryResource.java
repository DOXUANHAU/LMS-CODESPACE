package com.lms_backend.lms_project.resource;

import com.lms_backend.lms_project.Utility.Constant;
import com.lms_backend.lms_project.dao.CategoryDao;
import com.lms_backend.lms_project.dto.request.CategoryRequestDto;
import com.lms_backend.lms_project.dto.response.CategoryResponseDto;
import com.lms_backend.lms_project.dto.response.CommonApiResponse;
import com.lms_backend.lms_project.entity.Category;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.exception.CategorySaveFailedException;
import com.lms_backend.lms_project.service.CategoryService;
import com.lms_backend.lms_project.service.CourseService;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.*;

@Component
@Transactional
public class CategoryResource {
    private final Logger LOG = LoggerFactory.getLogger(CategoryResource.class);

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CourseService courseService;
    @Autowired
    private CategoryDao categoryDao;

    public ResponseEntity<CommonApiResponse> addCategory(CategoryRequestDto request) {
        LOG.info("Request received for add category");

        CommonApiResponse response = new CommonApiResponse();
        if (request == null) {
            response.setResponseMessage("missing input");
            response.setSuccess(false);

            return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
        }
        // Kiểm tra xem category đã tồn tại chưa (theo name)
        boolean exists = categoryService.existsByName(request.getName().trim());
        if (exists) {
            response.setResponseMessage("Category already exists");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        LocalDateTime now = LocalDateTime.now();
        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .status(request.getStatus())
                .deleted(false)
                .createdAt(now)
                .updateAt(now)
                .build();


        Category savedCategory = this.categoryService.addCategory(category);

        if (savedCategory == null) {
            throw new CategorySaveFailedException("Failed to add category");
        }

        response.setResponseMessage("Category Added Successful");
        response.setSuccess(true);

        return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> updateCategory(CategoryRequestDto request) {
        LOG.info("Request received for update category");

        CommonApiResponse response = new CommonApiResponse();

        if (request == null) {
            response.setResponseMessage("Missing input");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        if (request.getId() == 0) {
            response.setResponseMessage("Missing category ID");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra xem category có tồn tại không
        Category existingCategory = categoryService.getCategoryById(request.getId());
        if (existingCategory == null) {
            response.setResponseMessage("Category not found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        // Cập nhật thông tin category
        existingCategory.setName(request.getName());
        existingCategory.setDescription(request.getDescription());
        existingCategory.setStatus(request.getStatus());
        existingCategory.setUpdateAt(LocalDateTime.now());

        // Lưu category đã cập nhật
        Category savedCategory = categoryService.updateCategory(existingCategory);

        if (savedCategory == null) {
            throw new CategorySaveFailedException("Failed to update category");
        }

        response.setResponseMessage("Category Updated Successfully");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    public ResponseEntity<CategoryResponseDto> fetchAllCategory() {

        LOG.info("Request received for fetching all categories");

        CategoryResponseDto response = new CategoryResponseDto();

        List<Category> categories = new ArrayList<>();

        categories = this.categoryService.getAllCategoriesDeletedFalse();

        if (CollectionUtils.isEmpty(categories)) {
            response.setResponseMessage("No Categories found");
            response.setSuccess(false);

            return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
        }

        response.setCategories(categories);
        response.setResponseMessage("Category fetched successful");
        response.setSuccess(true);

        return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> deleteCategory(int categoryId) {

        LOG.info("Request received for deleting category");

        CommonApiResponse response = new CommonApiResponse();

        if (categoryId == 0) {
            response.setResponseMessage("missing category Id");
            response.setSuccess(false);

            return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
        }

        Category category = this.categoryService.getCategoryById(categoryId);

        if (category == null) {
            response.setResponseMessage("category not found");
            response.setSuccess(false);

            return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        List<Course> courses = this.courseService.getByCategoryAndStatus(category, Constant.ActiveStatus.ACTIVE.value());
        category.setStatus(Constant.ActiveStatus.DELETED.value());
        category.setDeleted(true);
        category.setDeletedAt(LocalDateTime.now());
        Category updatedCategory = this.categoryService.updateCategory(category);

        if (updatedCategory == null) {
            throw new CategorySaveFailedException("Failed to delete the Category");
        }

        if (!CollectionUtils.isEmpty(courses)) {

            for (Course course : courses) {
                course.setStatus(Constant.ActiveStatus.DEACTIVATED.value());
            }

            List<Course> updatedCourses = this.courseService.updateAll(courses);

            if (CollectionUtils.isEmpty(updatedCourses)) {
                throw new CategorySaveFailedException("Failed to delete the Course Category!!!");
            }

        }

        response.setResponseMessage("Course Category & all its Courses Deleted Successful");
        response.setSuccess(true);

        return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

    }

    public ResponseEntity<CategoryResponseDto> fetchAllCategoryDeleteTrue() {

        LOG.info("Request received for fetching all categories");

        CategoryResponseDto response = new CategoryResponseDto();

        List<Category> categories = new ArrayList<>();

        categories = this.categoryService.getAllCategoriesDeletedTrue();

        if (CollectionUtils.isEmpty(categories)) {
            response.setResponseMessage("No Categories found");
            response.setSuccess(false);

            return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
        }

        response.setCategories(categories);
        response.setResponseMessage("Category fetched successful");
        response.setSuccess(true);

        return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> reStoreCategory(int id) {
        LOG.info("Request received to restock category with ID: {}", id);

        CommonApiResponse response = new CommonApiResponse();

        if (id == 0) {
            response.setResponseMessage("Missing category ID");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Category category = categoryService.getCategoryById(id);

        if (category == null) {
            response.setResponseMessage("Category not found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        if (!category.isDeleted()) {
            response.setResponseMessage("Category is already active");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        category.setStatus(Constant.ActiveStatus.ACTIVE.value());
        category.setDeleted(false);
        category.setDeletedAt(null);
        category.setUpdateAt(LocalDateTime.now());

        Category updatedCategory = categoryService.updateCategory(category);

        if (updatedCategory == null) {
            throw new CategorySaveFailedException("Failed to restock the Category");
        }

        response.setResponseMessage("Category restocked successfully");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    public ResponseEntity<CommonApiResponse> deleteCategoryPermanently(int categoryId) {
        LOG.info("Request received for permanently deleting category with ID: {}", categoryId);

        CommonApiResponse response = new CommonApiResponse();

        if (categoryId == 0) {
            response.setResponseMessage("Missing category ID");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra xem category có tồn tại không
        Optional<Category> optionalCategory = categoryDao.findById(categoryId);
        if (!optionalCategory.isPresent()) {
            response.setResponseMessage("Category not found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        try {
            // Xóa category khỏi database
            categoryDao.deleteById(categoryId);
            response.setResponseMessage("Category deleted permanently");
            response.setSuccess(true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Error deleting category: {}", e.getMessage());
            response.setResponseMessage("Failed to delete category");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
