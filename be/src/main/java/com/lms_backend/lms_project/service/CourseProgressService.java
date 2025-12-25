package com.lms_backend.lms_project.service;

public interface CourseProgressService {
    void saveOrUpdate(int userId, int courseId, int percentCompleted);
    int getCourseProgress(int userId, int courseId);
}
