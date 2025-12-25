package com.lms_backend.lms_project.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        name = "course_ratings",
        indexes = {
                @Index(columnList = "course_id"),
                @Index(columnList = "user_id"),
                @Index(columnList = "created_at")
        }
)
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    @DecimalMin("0.5") @DecimalMax("5.0")
    @Digits(integer=1, fraction=1)
    private Double rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    public Rating(Double rating, String comment, User user, Course course) {
        this.rating = rating;
        this.comment = comment;
        this.user = user;
        this.course = course;
    }
}
