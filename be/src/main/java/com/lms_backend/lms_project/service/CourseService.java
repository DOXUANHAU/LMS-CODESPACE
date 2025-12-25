package com.lms_backend.lms_project.service;

import com.lms_backend.lms_project.entity.Category;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.User;

import java.util.List;

public interface CourseService {

    Course add(Course course);

    Course update(Course course);

    List<Course> updateAll(List<Course> courses);

    Course getById(int id);

    List<Course> getAll();

    List<Course> getByStatus(String status);

    List<Course> getByMentorAndStatus(User mentor, String status);

    List<Course> getByMentor(User mentor);

    List<Course> getByCategoryAndStatus(Category category, String status);

    List<Course> getByNameAndStatus(String name, String status);

    Long getCountByMentorAndStatus(User mentor, String status);

}
