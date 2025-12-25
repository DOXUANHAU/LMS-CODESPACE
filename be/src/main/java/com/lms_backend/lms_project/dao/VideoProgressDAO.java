package com.lms_backend.lms_project.dao;

import com.lms_backend.lms_project.entity.VideoProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface VideoProgressDAO extends JpaRepository<VideoProgress, Integer> {
    Optional<VideoProgress> findByUserIdAndVideoId(int userId, int videoId);

    @Query("SELECT COUNT(v) FROM VideoProgress v WHERE v.userId = :userId AND v.percentWatched = 100 AND v.videoId IN (SELECT t.id FROM CourseSectionTopic t WHERE t.courseSection.course.id = :courseId)")
    int countCompletedTopicsInCourse(@Param("userId") int userId, @Param("courseId") int courseId);

}