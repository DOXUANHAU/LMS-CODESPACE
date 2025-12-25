package com.lms_backend.lms_project.dao;

import com.lms_backend.lms_project.entity.CourseSectionTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseSectionTopicDao extends JpaRepository<CourseSectionTopic, Integer> {
    @Query("SELECT t.courseSection.id FROM CourseSectionTopic t WHERE t.id = :topicId")
    Integer findSectionIdByTopicId(@Param("topicId") int topicId);

    @Query("SELECT COUNT(t) FROM CourseSectionTopic t WHERE t.courseSection.course.id = :courseId")
    int countTopicsByCourseId(@Param("courseId") int courseId);
}

