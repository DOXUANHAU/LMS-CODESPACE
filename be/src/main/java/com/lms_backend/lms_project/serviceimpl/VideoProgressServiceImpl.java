package com.lms_backend.lms_project.serviceimpl;

import com.lms_backend.lms_project.dao.*;
import com.lms_backend.lms_project.dto.VideoProgressDTO;
import com.lms_backend.lms_project.entity.CourseProgress;
import com.lms_backend.lms_project.entity.CourseSectionTopic;
import com.lms_backend.lms_project.entity.VideoProgress;
import com.lms_backend.lms_project.service.CourseProgressService;
import com.lms_backend.lms_project.service.VideoProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoProgressServiceImpl implements VideoProgressService {
    @Autowired
    private VideoProgressDAO videoProgressDAO;

    @Autowired
    private CourseProgressService courseProgressService;

    @Autowired
    private CourseDao courseDao;

    @Autowired
    private CourseSectionTopicDao courseSectionTopicDAO;

    @Autowired
    private CourseSectionDao courseSectionDAO;

    @Override
    public void saveOrUpdate(VideoProgressDTO dto) {
        VideoProgress progress = videoProgressDAO.findByUserIdAndVideoId(dto.getUserId(), dto.getVideoId())
                .map(existing -> {
                    existing.setPercentWatched(Math.max(existing.getPercentWatched(), dto.getPercentWatched()));
                    return existing;
                })
                .orElse(VideoProgress.builder()
                        .userId(dto.getUserId())
                        .videoId(dto.getVideoId())
                        .percentWatched(dto.getPercentWatched())
                        .build());

        videoProgressDAO.save(progress);
    }

    @Override
    public void markCompleted(int userId, int videoId) {
        saveOrUpdate(VideoProgressDTO.builder()
                .userId(userId)
                .videoId(videoId)
                .percentWatched(100)
                .build());

        updateCourseProgress(userId, videoId);
    }

    private void updateCourseProgress(int userId, int videoId) {
        Integer sectionId = courseSectionTopicDAO.findSectionIdByTopicId(videoId);
        if (sectionId == null) return;

        Integer courseId = courseSectionDAO.findCourseIdBySectionId(sectionId);
        if (courseId == null) return;

        int totalTopics = courseSectionTopicDAO.countTopicsByCourseId(courseId);
        if (totalTopics == 0) return;

        int completedTopics = videoProgressDAO.countCompletedTopicsInCourse(userId, courseId);

        int courseProgress = (int) (((double) completedTopics / totalTopics) * 100);

        courseProgressService.saveOrUpdate(userId, courseId, courseProgress);
    }
}
