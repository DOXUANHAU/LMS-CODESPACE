package com.lms_backend.lms_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
//import java.s.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firebaseUid;

    private String username;

    private String firstName;

    private String lastName;

    private String emailId;

    @JsonIgnore
    private String password;

    private String phoneNo;

    private LocalDateTime createdAt;

    private LocalDateTime updateAt;

    private LocalDateTime deletedAt;

    private String oauth2_id;

    private String oauth2_provider;

    private String role;

    private String avatar;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToOne
    @JoinColumn(name = "mentor_detail_id")
    private MentorDetail mentorDetail;

    private BigDecimal amount;

    private String status;

    // Thêm vào class User
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Rating> ratings = new ArrayList<>();

    // Thêm phương thức helper
    public void addRating(Rating rating) {
        ratings.add(rating);
        rating.setUser(this);
    }

    public void removeRating(Rating rating) {
        ratings.remove(rating);
        rating.setUser(null);
    }

}
