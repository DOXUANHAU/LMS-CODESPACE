package com.lms_backend.lms_project.serviceimpl;

import com.lms_backend.lms_project.dao.CourseDao;
import com.lms_backend.lms_project.dao.RatingDAO;
import com.lms_backend.lms_project.dao.UserDAO;
import com.lms_backend.lms_project.dto.CourseDTO;
import com.lms_backend.lms_project.dto.UserDTO;
import com.lms_backend.lms_project.dto.request.RatingRequest;
import com.lms_backend.lms_project.dto.response.RatingListResponse;
import com.lms_backend.lms_project.dto.response.RatingResponse;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.Rating;
import com.lms_backend.lms_project.entity.User;
import com.lms_backend.lms_project.exception.BusinessException;
import com.lms_backend.lms_project.exception.ResourceNotFoundException;
import com.lms_backend.lms_project.service.RatingService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class RatingServiceImpl implements RatingService {
    @Autowired
    RatingDAO ratingDAO;

    @Autowired
    CourseDao courseDao;

    @Autowired
    UserDAO userDAO;

    @Override
    @Transactional(readOnly = true)
    public RatingListResponse fetchRatingsByCourse(int courseId) {
        List<Rating> ratings = ratingDAO.findByCourseId(courseId);
        Double average = ratingDAO.calculateAverageRating(courseId);
        Long count = ratingDAO.countByCourseId(courseId);

        Map<Double, Long> ratingDistribution = ratingDAO.getRatingDistribution(courseId)
                .stream()
                .collect(Collectors.toMap(
                        arr -> (Double) arr[0],
                        arr -> (Long) arr[1]
                ));

        return RatingListResponse.builder()
                .ratings(ratings.stream().map(this::convertToResponse).collect(Collectors.toList()))
                .averageRating(average != null ? average : 0.0)
                .totalRatings(count)
                .ratingDistribution(ratingDistribution)
                .build();
    }


    @Override
    @Transactional
    public RatingResponse addRating(RatingRequest request) {
        User user = userDAO.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));

        Course course = courseDao.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khóa học"));

        // Làm tròn rating đến 0.5
        double roundedRating = Math.round(request.getRating() * 2) / 2.0;
        int totalRating = course.getTotalRating();

        Rating rating = new Rating();
        rating.setRating(roundedRating);
        rating.setComment(request.getComment());
        rating.setUser(user);
        rating.setCourse(course);

        Rating savedRating = ratingDAO.save(rating);
        // Save rating count of course;
        course.setTotalRating(totalRating+1);

        return convertToResponse(savedRating);
    }

    private RatingResponse convertToResponse(Rating rating) {
        return RatingResponse.builder()
                .id(rating.getId())
                .rating(rating.getRating())
                .comment(rating.getComment())
                .createdAt(rating.getCreatedAt())
                .course(CourseDTO.builder()
                        .id(rating.getCourse().getId())
                        .name(rating.getCourse().getName())
                        .build())
                .user(RatingResponse.UserInfo.builder()
                        .id(rating.getUser().getId())
                        .firstName(rating.getUser().getFirstName())
                        .lastName(rating.getUser().getLastName())
                        .avatar(rating.getUser().getAvatar())
                        .role(rating.getUser().getRole())
                        .build())
                .build();
    }
    @Override
    public RatingListResponse getRatingsByUser(int userId) {
        List<Rating> ratings = ratingDAO.findAllByUserId(userId);
        return RatingListResponse.builder()
                .ratings(ratings.stream().map(this::convertToResponse).collect(Collectors.toList()))
                .build();
    }
}
