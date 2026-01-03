package com.lms_backend.lms_project.controller;


import com.lms_backend.lms_project.dto.CourseDTO;
import com.lms_backend.lms_project.dto.VideoProgressDTO;
import com.lms_backend.lms_project.dto.request.*;
import com.lms_backend.lms_project.dto.response.CommonApiResponse;
import com.lms_backend.lms_project.dto.response.CourseResponseDto;
import com.lms_backend.lms_project.resource.CourseResource;
import com.lms_backend.lms_project.service.CourseProgressService;
import com.lms_backend.lms_project.service.RatingService;
import com.lms_backend.lms_project.service.VideoProgressService;
import com.lowagie.text.DocumentException;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/course")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseResource courseResource;

    @Autowired
    VideoProgressService videoProgressService;

    @Autowired
    RatingService ratingService;

    @Autowired
    CourseProgressService courseProgressService;

    @PostMapping("add")
    @Operation(summary = "Api to add the Mentor Course")
    public ResponseEntity<CourseResponseDto> addCourse(@ModelAttribute AddCourseRequestDto request) {
        return this.courseResource.addCourse(request);
    }

    @PutMapping("/update/{id}")
    @Operation(summary = "Api to update category")
    public ResponseEntity<CommonApiResponse> updateCategory(@PathVariable("id") int id, @ModelAttribute CourseDTO request) {
        return courseResource.updateCourse(id, request);
    }

    @PostMapping("section/add")
    @Operation(summary = "Api to add the course section")
    public ResponseEntity<CourseResponseDto> addCourseSection(@RequestBody AddCourseSectionRequestDto request) {
        return this.courseResource.addCourseSection(request);
    }

    @PostMapping(value = "section/topic/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Api to add the course section topic")
    public ResponseEntity<CourseResponseDto> addCourseSectionTopic(@ModelAttribute AddCourseSectionTopicRequest request) {
        return this.courseResource.addCourseSectionTopic(request);
    }

    @GetMapping("/fetch/mentor-wise")
    @Operation(summary = "Api to fetch courses by using status")
    public ResponseEntity<CourseResponseDto> fetchCoursesByMentor(@RequestParam("mentorId") Integer mentorId,
                                                                  @RequestParam("status") String status, @RequestParam("videoShow") String videoShow) {
        return courseResource.fetchCoursesByMentor(mentorId, status, videoShow);
    }

    @GetMapping("/fetch/course-id")
    @Operation(summary = "Api to fetch course by using course id")
    public ResponseEntity<CourseResponseDto> fetchCourseById(@RequestParam("courseId") Integer courseId,
                                                             @RequestParam("videoShow") String videoShow) {
        return courseResource.fetchCourseById(courseId, videoShow);
    }

    @GetMapping(value = "/{courseImageName}", produces = "image/*")
    public void fetchCourseImage(@PathVariable("courseImageName") String courseImageName, HttpServletResponse resp) {
        this.courseResource.fetchCourseImage(courseImageName, resp);
    }

    @GetMapping("/fetch/status-wise")
    @Operation(summary = "Api to fetch courses by using status")
    public ResponseEntity<CourseResponseDto> fetchCoursesByStatus(@RequestParam("status") String status,
                                                                  @RequestParam("videoShow") String videoShow) {
        return courseResource.fetchCoursesByStatus(status, videoShow);
    }

    @GetMapping(value = "/video/{courseSectionTopicVideoFileName}", produces = "video/*")
    public void fetchCourseTopicVideo(
            @PathVariable("courseSectionTopicVideoFileName") String courseSectionTopicVideoFileName,
            HttpServletResponse resp) {
        this.courseResource.fetchCourseTopicVideo(courseSectionTopicVideoFileName, resp);
    }

    @GetMapping(value= "excercies/{exerciseFileName}", produces = "application/docx")
    public void fetchExerciseFile(@PathVariable("exerciseFileName") String exerciseFileName,
                                  HttpServletResponse resp) {
        this.courseResource.fetchExerciseFile(exerciseFileName, resp);
    }
    

    @PutMapping("/video-progress/update")
    public ResponseEntity<?> updateProgress(@RequestBody VideoProgressDTO dto) {
        videoProgressService.saveOrUpdate(dto);
        return ResponseEntity.ok("Video progress updated");
    }

    @PostMapping("/video-progress/mark-completed")
    public ResponseEntity<?> markCompleted(@RequestBody VideoProgressDTO dto) {
        videoProgressService.markCompleted(dto.getUserId(), dto.getVideoId());
        return ResponseEntity.ok("Video marked as completed");
    }

    @GetMapping("/course-progress/{userId}/{courseId}")
    public ResponseEntity<Integer> getCourseProgress(@PathVariable int userId, @PathVariable int courseId) {
        int progress = courseProgressService.getCourseProgress(userId, courseId);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("notes/{notesFileName}/download")
    @Operation(summary = "Api for downloading the Course Notes")
    public ResponseEntity<Resource> downloadNotes(@PathVariable("notesFileName") String notesFileName,
                                                  HttpServletResponse response) throws DocumentException, IOException {
        return this.courseResource.downloadNotes(notesFileName, response);
    }

    @GetMapping("/fetch/name-wise")
    @Operation(summary = "Api to fetch courses by using name")
    public ResponseEntity<CourseResponseDto> fetchCoursesByName(@RequestParam("courseName") String courseName) {
        return courseResource.fetchCoursesByName(courseName);
    }



}
