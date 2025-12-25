package com.lms_backend.lms_project.serviceimpl;

import com.lms_backend.lms_project.dao.CourseProgressDAO;
import com.lms_backend.lms_project.entity.CourseProgress;
import com.lms_backend.lms_project.service.CourseProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseProgressServiceImpl implements CourseProgressService {
    @Autowired
    private CourseProgressDAO courseProgressDAO;
    @Override
    public void saveOrUpdate(int userId, int courseId, int percentCompleted) {
        CourseProgress progress = courseProgressDAO.findByUserIdAndCourseId(userId, courseId)
                .orElse(CourseProgress.builder()
                        .userId(userId)
                        .courseId(courseId)
                        .percentCompleted(0)
                        .build());

        progress.setPercentCompleted(percentCompleted);
        courseProgressDAO.save(progress);
    }

    @Override
    public int getCourseProgress(int userId, int courseId) {
        return courseProgressDAO.findByUserIdAndCourseId(userId, courseId)
                .map(CourseProgress::getPercentCompleted)
                .orElse(0);
    }
}
