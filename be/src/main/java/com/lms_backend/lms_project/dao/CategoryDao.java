package com.lms_backend.lms_project.dao;


import java.util.List;

import com.lms_backend.lms_project.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryDao extends JpaRepository<Category, Integer> {

    List<Category> findByStatusIn(List<String> status);
    boolean existsByName(String name);
    Long countByStatusIn(List<String> status);
    List<Category> findByDeletedFalse();
    List<Category> findByDeletedTrue();

}

