package com.lms_backend.lms_project.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private User mentor; // tour guide id

    @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinColumn(name = "category_id")
    private Category category;

    private String name;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    private String type; // free, paid

    private BigDecimal fee;

    private String addedDateTime;

    private String notesFileName;

    private String thumbnail;

    private String status;

    private int discountInPercent;

    private int quantityStudent;

    private int totalRating;

    @Column(columnDefinition = "LONGTEXT")
    private String authorCourseNote;

    @Column(columnDefinition = "LONGTEXT")
    private String specialNote;

    @Column(columnDefinition = "LONGTEXT")
    private String prerequisite;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseSection> sections = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Collaborator> collabrators = new ArrayList<>();

    // Thêm vào class Course
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Rating> ratings = new ArrayList<>();

    // Thêm phương thức helper
    public void addRating(Rating rating) {
        ratings.add(rating);
        rating.setCourse(this);
    }

    public void removeRating(Rating rating) {
        ratings.remove(rating);
        rating.setCourse(null);
    }

    @Transient
    public Double getAverageRating() {
        if (ratings == null || ratings.isEmpty()) {
            return 0.0;
        }

        return ratings.stream()
                .mapToDouble(Rating::getRating)
                .average()
                .orElse(0.0);
    }

}

