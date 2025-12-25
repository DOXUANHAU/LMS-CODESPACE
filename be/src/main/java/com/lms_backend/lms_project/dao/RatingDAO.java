package com.lms_backend.lms_project.dao;

import com.lms_backend.lms_project.dto.response.RatingResponse;
import com.lms_backend.lms_project.entity.Rating;
import com.lms_backend.lms_project.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingDAO extends JpaRepository<Rating, Integer> {
    @Query("SELECT r FROM Rating r JOIN FETCH r.user WHERE r.course.id = :courseId ORDER BY r.createdAt DESC")
    List<Rating> findByCourseId(@Param("courseId") int courseId);

    @Query("SELECT r FROM Rating r WHERE r.course.id = :courseId ORDER BY r.createdAt DESC")
    List<Rating> findByCourse(@Param("courseId") int courseId);

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.course.id = :courseId")
    Double calculateAverageRating(@Param("courseId") int courseId);

    @Query("SELECT COUNT(r) FROM Rating r WHERE r.course.id = :courseId")
    Long countByCourseId(@Param("courseId") int courseId);

    @Query("SELECT r.rating, COUNT(r) FROM Rating r WHERE r.course.id = :courseId GROUP BY r.rating")
    List<Object[]> getRatingDistribution(@Param("courseId") int courseId);

    @Query("SELECT r FROM Rating r WHERE r.user.id = :userId")
    List<Rating> findAllByUserId(@Param("userId") int userId);

}
