package com.lms_backend.lms_project.controller;
import com.lms_backend.lms_project.dto.request.CategoryRequestDto;
import com.lms_backend.lms_project.dto.response.CategoryResponseDto;
import com.lms_backend.lms_project.dto.response.CommonApiResponse;
import com.lms_backend.lms_project.entity.Category;
import com.lms_backend.lms_project.resource.CategoryResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/course/category")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    @Autowired
    private CategoryResource categoryResource;

    @PostMapping("/add")
    @Operation(summary = "Api to add category")
    public ResponseEntity<CommonApiResponse> addCategory(@RequestBody CategoryRequestDto request) {
        return categoryResource.addCategory(request);
    }

    @PutMapping("/update")
    @Operation(summary = "Api to update category")
    public ResponseEntity<CommonApiResponse> updateCategory(@RequestBody CategoryRequestDto request) {
        return categoryResource.updateCategory(request);
    }

    @GetMapping("/fetch/all")
    @Operation(summary = "Api to fetch all category")
    public ResponseEntity<CategoryResponseDto> fetchAllCategory() {
        return categoryResource.fetchAllCategory();
    }

    @GetMapping("/fetch-deleted/all")
    @Operation(summary = "Api to fetch all category deleted true")
    public ResponseEntity<CategoryResponseDto> fetchAllCategoryDeletedTrue() {
        return categoryResource.fetchAllCategoryDeleteTrue();
    }

    @PutMapping("/restore")
    @Operation(summary = "API to restock category")
    public ResponseEntity<CommonApiResponse> reStockCategory(@RequestParam("categoryId") int categoryId) {
        return categoryResource.reStoreCategory(categoryId);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Api to delete category all its events")
    public ResponseEntity<CommonApiResponse> deleteCategory(@RequestParam("categoryId") int categoryId) {
        return categoryResource.deleteCategory(categoryId);
    }

    @DeleteMapping("/delete-permanently")
    @Operation(summary = "Api to delete category all its events")
    public ResponseEntity<CommonApiResponse> deleteCategoryPermanently(@RequestParam("categoryId") int categoryId) {
        return categoryResource.deleteCategoryPermanently(categoryId);
    }

}

