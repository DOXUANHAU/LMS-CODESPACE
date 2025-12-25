package com.lms_backend.lms_project.dao;

import com.lms_backend.lms_project.entity.CourseProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseProgressDAO extends JpaRepository<CourseProgress, Integer> {
    Optional<CourseProgress> findByUserIdAndCourseId(int userId, int courseId);
}
