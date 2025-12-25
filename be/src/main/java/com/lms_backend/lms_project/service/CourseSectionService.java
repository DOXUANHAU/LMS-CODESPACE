package com.lms_backend.lms_project.service;

import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.CourseSection;

import java.util.List;

public interface CourseSectionService {
    CourseSection add(CourseSection section);

    CourseSection getById(int section);

    List<CourseSection> getByCourse(Course course);
}
