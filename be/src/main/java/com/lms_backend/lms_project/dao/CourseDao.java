package com.lms_backend.lms_project.dao;

import java.util.List;

import com.lms_backend.lms_project.entity.Category;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CourseDao extends JpaRepository<Course, Integer> {

    List<Course> findByMentorOrderByIdDesc(User mentor);

    List<Course> findByMentorAndStatusOrderByIdDesc(User mentor, String status);

    List<Course> findByCategoryAndStatusOrderByIdDesc(Category category, String status);

    List<Course> findByStatusAndNameContainingIgnoreCaseOrderByIdDesc(String status, String name);

    List<Course> findByStatusOrderByIdDesc(String status);

    Long countByMentorAndStatus(User mentor, String status);

    List<Course> findByCategory_NameContainingIgnoreCaseAndStatusOrderByIdDesc(String categoryNamePart, String status);

}

