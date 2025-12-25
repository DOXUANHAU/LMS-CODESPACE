package com.lms_backend.lms_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class CourseSectionTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String srNo;

    private String name;

    private String description;

    private String videoFileName;

    private String documentFileName;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "section_id")
    private CourseSection courseSection;

}
