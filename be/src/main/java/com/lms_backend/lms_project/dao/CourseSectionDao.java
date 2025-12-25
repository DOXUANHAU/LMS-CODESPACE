package com.lms_backend.lms_project.dao;

import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.CourseSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseSectionDao extends JpaRepository<CourseSection, Integer> {

    List<CourseSection> findByCourse(Course course);
    @Query("SELECT s.course.id FROM CourseSection s WHERE s.id = :sectionId")
    Integer findCourseIdBySectionId(@Param("sectionId") int sectionId);
}
