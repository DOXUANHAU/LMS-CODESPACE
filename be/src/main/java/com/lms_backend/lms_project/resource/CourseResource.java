package com.lms_backend.lms_project.resource;

import com.lms_backend.lms_project.Utility.Constant;
import com.lms_backend.lms_project.Utility.CustomMultipartFile;
import com.lms_backend.lms_project.dao.CourseDao;
import com.lms_backend.lms_project.dto.CourseDTO;
import com.lms_backend.lms_project.dto.CourseSectionDTO;
import com.lms_backend.lms_project.dto.CourseSectionTopicDTO;
import com.lms_backend.lms_project.dto.UserDTO;
import com.lms_backend.lms_project.dto.request.AddCourseRequestDto;
import com.lms_backend.lms_project.dto.request.AddCourseSectionRequestDto;
import com.lms_backend.lms_project.dto.request.AddCourseSectionTopicRequest;
import com.lms_backend.lms_project.dto.response.CommonApiResponse;
import com.lms_backend.lms_project.dto.response.CourseResponseDto;
import com.lms_backend.lms_project.dto.response.RatingResponse;
import com.lms_backend.lms_project.entity.*;
import com.lms_backend.lms_project.exception.CategorySaveFailedException;
import com.lms_backend.lms_project.exception.CourseSaveFailedException;
import com.lms_backend.lms_project.exception.ResourceNotFoundException;
import com.lms_backend.lms_project.service.*;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Component
public class CourseResource {
    private final Logger LOG = LoggerFactory.getLogger(CourseResource.class);

    @Value("${com.lms.profile.image.folder.path}")
    private String PROFILE_PIC_BASEPATH;

    @Value("${com.lms.course.video.folder.path}")
    private String COURSE_VIDEO_BASEPATH;

    @Value("${com.lms.course.notes.folder.path}")
    private String COURSE_NOTE_BASEPATH;

    @Autowired
    private CourseService courseService;

    @Autowired
    private CourseSectionService courseSectionService;

    @Autowired
    private CourseSectionTopicService courseSectionTopicService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private StorageService storageService;

    @Autowired
    private BookingService bookingService;
    @Autowired
    private CourseDao courseDao;

    public ResponseEntity<CourseResponseDto> addCourse(AddCourseRequestDto request) {

        LOG.info("received request for adding the mentor course");

        CourseResponseDto response = new CourseResponseDto();

        if (request == null) {
            response.setResponseMessage("missing request body");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        if (request.getCategoryId() == 0 || request.getDescription() == null || request.getMentorId() == 0
                || request.getName() == null || request.getNotesFileName() == null || request.getType() == null
                || request.getThumbnail() == null) {
            response.setResponseMessage("missing input");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        String addedDateTime = String
                .valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

        Category category = this.categoryService.getCategoryById(request.getCategoryId());

        if (category == null) {
            response.setResponseMessage("category not found");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        User mentor = this.userService.getUserById(request.getMentorId());

        if (mentor == null) {
            response.setResponseMessage("mentor not found");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        Course course = AddCourseRequestDto.toEntity(request);
        int currentQuantiyCourse = mentor.getMentorDetail().getQuantityCourse();
        MentorDetail mentorDetail = mentor.getMentorDetail();
        mentorDetail.setQuantityCourse(currentQuantiyCourse+1);

        String courseNote = this.storageService.storeCourseNote(request.getNotesFileName());
        String thumbnailFilename = this.storageService.storeCourseNote(request.getThumbnail());

        course.setThumbnail(thumbnailFilename);
        course.setAddedDateTime(addedDateTime);
        course.setNotesFileName(courseNote);
        course.setCategory(category);
        course.setMentor(mentor);
        course.setStatus(Constant.ActiveStatus.ACTIVE.value());

        Course savedCourse = this.courseService.add(course);

        if (savedCourse == null) {
            response.setResponseMessage("Failed to add the course");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            response.setCourse(savedCourse);
            response.setResponseMessage("Course Created Successful, Add Course Section now....");
            response.setSuccess(true);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.OK);
        }
    }

    public ResponseEntity<CourseResponseDto> addCourseSection(AddCourseSectionRequestDto request) {

        LOG.info("received request for adding the course section");

        CourseResponseDto response = new CourseResponseDto();

        if (request == null) {
            response.setResponseMessage("missing request body");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        if (request.getCourseId() == 0 || request.getName() == null || request.getDescription() == null
                || request.getSrNo() == null) {
            response.setResponseMessage("missing input");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        Course course = this.courseService.getById(request.getCourseId());

        if (course == null) {
            response.setResponseMessage("course not found!!!");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        CourseSection section = new CourseSection();

        section.setCourse(course);
        section.setDescription(request.getDescription());
        section.setName(request.getName());
        section.setSrNo(request.getSrNo());

        CourseSection savedSection = this.courseSectionService.add(section);

        if (savedSection == null) {
            response.setCourse(course);
            response.setResponseMessage("Failed to add the course section");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {

            Course updatedCourse = this.courseService.getById(request.getCourseId());

            response.setCourse(updatedCourse);
            response.setResponseMessage("Course Section Added successful!!!");
            response.setSuccess(true);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.OK);
        }

    }

    public ResponseEntity<CourseResponseDto> addCourseSectionTopic(AddCourseSectionTopicRequest request) {
        LOG.info("Received request for adding the course section topic");

        CourseResponseDto response = new CourseResponseDto();

        if (request.getSectionId() == 0 || request.getName() == null || request.getDescription() == null
                || request.getSrNo() == null || request.getVideo() == null) {
            response.setResponseMessage("Missing input");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        CourseSection section = this.courseSectionService.getById(request.getSectionId());
        if (section == null) {
            response.setResponseMessage("Course Section not found!!!");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        CourseSectionTopic topic = new CourseSectionTopic();
        topic.setName(request.getName());
        topic.setSrNo(request.getSrNo());
        topic.setDescription(request.getDescription());
        topic.setCourseSection(section);

        try {
            // Lưu file video
            String topicVideoFileName = this.storageService.storeCourseVideo(request.getVideo());
            String topicDocumentFileName = this.storageService.storeCourseDocument(request.getExerciseFile());
            topic.setVideoFileName(topicVideoFileName);
            topic.setDocumentFileName(topicDocumentFileName);

            // Lưu vào database
            CourseSectionTopic savedTopic = this.courseSectionTopicService.add(topic);

            Course updatedCourse = this.courseService.getById(section.getCourse().getId());

            if (savedTopic == null) {
                response.setCourse(updatedCourse);
                response.setResponseMessage("Failed to add the course section topic");
                response.setSuccess(false);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                response.setCourse(updatedCourse);
                response.setResponseMessage("Course Section Topic Added successfully!!!");
                response.setSuccess(true);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (Exception e) {
            LOG.error("Error while adding course section topic", e);
            response.setResponseMessage("Internal Server Error");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<CourseResponseDto> fetchCoursesByMentor(Integer mentorId, String status, String videoShow) {

        LOG.info("received request for fetching the courses by mentor and status");

        CourseResponseDto response = new CourseResponseDto();

        if (mentorId == null || mentorId == 0 || status == null || videoShow == null) {
            response.setResponseMessage("missing input");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        User mentor = this.userService.getUserById(mentorId);

        if (mentor == null || !mentor.getRole().equals(Constant.UserRole.ROLE_MENTOR.value())) {
            response.setResponseMessage("mentor not found");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        List<Course> courses = this.courseService.getByMentorAndStatus(mentor, status);

        if (CollectionUtils.isEmpty(courses)) {
            response.setResponseMessage("Courses not found!!!");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.OK);
        }

        if (videoShow.equals(Constant.CourseTopicVideoShow.NO.value())) {

            for (Course course : courses) {
                List<CourseSection> sections = course.getSections();
                if (!CollectionUtils.isEmpty(sections)) {

                    for (CourseSection section : sections) {

                        List<CourseSectionTopic> topics = section.getCourseSectionTopics();

                        if (!CollectionUtils.isEmpty(topics)) {

                            for (CourseSectionTopic topic : topics) {
                                topic.setVideoFileName("");
                            }

                        }

                    }

                }
            }

        }

        response.setCourses(courses);
        response.setResponseMessage("Courses Fetched Successful!!!");
        response.setSuccess(true);

        return new ResponseEntity<CourseResponseDto>(response, HttpStatus.OK);

    }

    public ResponseEntity<CourseResponseDto> fetchCourseById(Integer courseId, String toShowVideo) {

        LOG.info("received request for fetching the course by using id");

        CourseResponseDto response = new CourseResponseDto();

        if (courseId == null || courseId == 0) {
            response.setResponseMessage("missing course id");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        Course course = this.courseService.getById(courseId);

        if (course == null) {
            response.setResponseMessage("course not found!!!");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        List<CourseSection> sections = course.getSections();

        if (toShowVideo.equals(Constant.CourseTopicVideoShow.NO.value())) {
            if (!CollectionUtils.isEmpty(sections)) {

                for (CourseSection section : sections) {

                    List<CourseSectionTopic> topics = section.getCourseSectionTopics();

                    if (!CollectionUtils.isEmpty(topics)) {

                        for (CourseSectionTopic topic : topics) {
                            topic.setVideoFileName("");
                        }

                    }

                }

            }
        }

        response.setCourse(course);
        response.setResponseMessage("Course Fetched Successful!!!");
        response.setSuccess(true);

        return new ResponseEntity<CourseResponseDto>(response, HttpStatus.OK);

    }
    public void fetchCourseImage(String courseImageName, HttpServletResponse resp) {
        Resource resource = storageService.loadCourseNote(courseImageName);
        if (resource == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        String mimeType = URLConnection.guessContentTypeFromName(courseImageName);
        if (mimeType == null) {
            mimeType = "application/octet-stream"; // Mặc định nếu không xác định được loại file
        }

        resp.setContentType(mimeType);

        try (InputStream in = resource.getInputStream();
             ServletOutputStream out = resp.getOutputStream()) {
            FileCopyUtils.copy(in, out);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public ResponseEntity<CourseResponseDto> fetchCoursesByStatus(String status, String videoShow) {
        LOG.info("Received request for fetching courses by status: {}", status);

        CourseResponseDto response = new CourseResponseDto();

        // Validate input
        if (status == null || videoShow == null) {
            response.setResponseMessage("Missing required parameters: status and videoShow");
            response.setSuccess(false);
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // Fetch courses with status
            List<Course> courses = courseService.getByStatus(status);

            if (CollectionUtils.isEmpty(courses)) {
                response.setResponseMessage("No courses found with status: " + status);
                response.setSuccess(true); // Coi đây không phải là lỗi
                return ResponseEntity.ok().body(response);
            }

            // Convert to DTOs
            List<CourseDTO> courseDTOs = courses.stream()
                    .map(course -> convertToCourseDTO(course, videoShow))
                    .collect(Collectors.toList());

            // Build response
            response.setCourseDTOs(courseDTOs);
            response.setResponseMessage("Successfully fetched " + courseDTOs.size() + " courses");
            response.setSuccess(true);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            LOG.error("Error fetching courses by status", e);
            response.setResponseMessage("Internal server error");
            response.setSuccess(false);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    private CourseDTO convertToCourseDTO(Course course, String videoShow) {
        // Chuyển từ File sang CustomMultipartFile
        File fileNote = new File(COURSE_NOTE_BASEPATH, course.getNotesFileName());
        File fileThumbnail = new File(COURSE_NOTE_BASEPATH, course.getThumbnail());
        CustomMultipartFile fileNoteMultipart = new CustomMultipartFile(fileNote);
        CustomMultipartFile fileThumbnailMultipart = new CustomMultipartFile(fileThumbnail);
        CourseDTO.CourseDTOBuilder builder = CourseDTO.builder()
                .id(course.getId())
                .name(course.getName())
                .description(course.getDescription())
                .type(course.getType())
                .fee(course.getFee())
                .addedDateTime(course.getAddedDateTime())
                .notesFileName(course.getNotesFileName())
                .thumbnail(course.getThumbnail())
                .status(course.getStatus())
                .totalRating(course.getTotalRating())
                .discountInPercent(course.getDiscountInPercent())
                .authorCourseNote(course.getAuthorCourseNote())
                .specialNote(course.getSpecialNote())
                .prerequisite(course.getPrerequisite())
                .averageRating(course.getAverageRating());

        // Set mentor info
        if (course.getMentor() != null) {
            builder.mentorId(course.getMentor().getId())
                    .mentorName(course.getMentor().getFirstName() + " " + course.getMentor().getLastName());
        }

        // Set category info
        if (course.getCategory() != null) {
            builder.categoryId(course.getCategory().getId())
                    .categoryName(course.getCategory().getName());
        }

        // Process sections and topics if they are loaded
        if (course.getSections() != null && !course.getSections().isEmpty()) {
            List<CourseSectionDTO> sectionDTOs = course.getSections().stream()
                    .sorted(Comparator.comparing(CourseSection::getSrNo))
                    .map(section -> convertToSectionDTO(section, videoShow))
                    .collect(Collectors.toList());
            builder.sections(sectionDTOs);
        }

        return builder.build();
    }

    private CourseSectionDTO convertToSectionDTO(CourseSection section, String videoShow) {
        CourseSectionDTO.CourseSectionDTOBuilder builder = CourseSectionDTO.builder()
                .id(section.getId())
                .srNo(section.getSrNo())
                .name(section.getName())
                .description(section.getDescription());

        // Process topics if they are loaded
        if (section.getCourseSectionTopics() != null && !section.getCourseSectionTopics().isEmpty()) {
            List<CourseSectionTopicDTO> topicDTOs = section.getCourseSectionTopics().stream()
                    .sorted(Comparator.comparing(CourseSectionTopic::getSrNo))
                    .map(topic -> convertToTopicDTO(topic, videoShow))
                    .collect(Collectors.toList());
            builder.topics(topicDTOs);
        }

        return builder.build();
    }

    private CourseSectionTopicDTO convertToTopicDTO(CourseSectionTopic topic, String videoShow) {
        return CourseSectionTopicDTO.builder()
                .id(topic.getId())
                .srNo(topic.getSrNo())
                .name(topic.getName())
                .description(topic.getDescription())
                .videoFileName(shouldShowVideo(videoShow) ? topic.getVideoFileName() : "")
                .build();
    }

    private boolean shouldShowVideo(String videoShow) {
        return Constant.CourseTopicVideoShow.YES.value().equals(videoShow);
    }

    public void fetchCourseTopicVideo(String courseSectionTopicVideoFileName, HttpServletResponse resp) {
        Resource resource = storageService.loadCourseVideo(courseSectionTopicVideoFileName);
        if (resource != null && resource.exists()) {
            try (InputStream in = resource.getInputStream(); ServletOutputStream out = resp.getOutputStream()) {
                resp.setContentType("video/mp4");
                FileCopyUtils.copy(in, out);
                out.flush();
            } catch (IOException e) {

                LOG.info("Video Player closed or any netwrok issue!!!");

                e.printStackTrace();
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

            }
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    public ResponseEntity<CourseResponseDto> fetchCourseByIdAndUserId(Integer courseId, Integer userId) {

        LOG.info("received request for fetching the course by id and used id");

        CourseResponseDto response = new CourseResponseDto();

        if (courseId == null || courseId == 0) {
            response.setResponseMessage("missing course id");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        Course course = this.courseService.getById(courseId);

        if (course == null) {
            response.setResponseMessage("course not found!!!");
            response.setSuccess(false);

            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        List<CourseSection> sections = course.getSections();

        if (!CollectionUtils.isEmpty(sections)) {

            for (CourseSection section : sections) {

                List<CourseSectionTopic> topics = section.getCourseSectionTopics();

                if (!CollectionUtils.isEmpty(topics)) {

                    for (CourseSectionTopic topic : topics) {
                        topic.setVideoFileName("");
                    }

                }

            }

        }

        User student = null;

        if (userId > 0 && course.getType().equals(Constant.CourseType.PAID.value())) {
            student = this.userService.getUserById(userId);

            if (student != null) {

                List<Booking> bookings = this.bookingService.getByCourseAndCustomer(course, student);

                if (!CollectionUtils.isEmpty(bookings)) {
                    response.setIsCoursePurchased(Constant.CoursePurchased.YES.value());
                } else {
                    response.setIsCoursePurchased(Constant.CoursePurchased.NO.value());
                }

            }

        }

        response.setCourse(course);
        response.setResponseMessage("Course Fetched Successful!!!");
        response.setSuccess(true);

        return new ResponseEntity<CourseResponseDto>(response, HttpStatus.OK);

    }

    public ResponseEntity<Resource> downloadNotes(String notesFileName, HttpServletResponse response) {

        Resource resource = storageService.loadCourseNote(notesFileName);
        if (resource == null) {
            // Handle file not found
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Course_Notes\"")
                .body(resource);

    }

    public ResponseEntity<CourseResponseDto> fetchCoursesByName(String nameSearch) {

        LOG.info("Received request for fetching courses by name");

        CourseResponseDto response = new CourseResponseDto();

        // Kiểm tra nếu nameSearch null
        if (nameSearch == null) {
            response.setResponseMessage("Missing input");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Tìm kiếm khóa học theo tên khóa học
        List<Course> coursesByNameCourse = this.courseService.getByNameAndStatus(nameSearch, Constant.ActiveStatus.ACTIVE.value());
        // Tìm kiếm khóa học theo tên category
        List<Course> coursesByNameCategory = this.categoryService.getCoursesByCategoryName(nameSearch, Constant.ActiveStatus.ACTIVE.value());

        // Kết hợp các khóa học tìm được từ tên khóa học và tên category
        List<Course> allCourses = new ArrayList<>();
        if (!CollectionUtils.isEmpty(coursesByNameCourse)) {
            allCourses.addAll(coursesByNameCourse);
        }

        if (!CollectionUtils.isEmpty(coursesByNameCategory)) {
            allCourses.addAll(coursesByNameCategory);
        }

        // Nếu không có khóa học nào tìm được
        if (allCourses.isEmpty()) {
            response.setResponseMessage("Courses not found!!!");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        // Xử lý khóa học (nếu cần thiết)
        for (Course course : allCourses) {
            List<CourseSection> sections = course.getSections();
            if (!CollectionUtils.isEmpty(sections)) {
                for (CourseSection section : sections) {
                    List<CourseSectionTopic> topics = section.getCourseSectionTopics();
                    if (!CollectionUtils.isEmpty(topics)) {
                        for (CourseSectionTopic topic : topics) {
                            topic.setVideoFileName("");  // Nếu cần, có thể set lại video filename
                        }
                    }
                }
            }
        }

        // Trả về kết quả khóa học đã tìm
        response.setCourses(allCourses);
        response.setResponseMessage("Courses fetched successfully!");
        response.setSuccess(true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<CommonApiResponse> updateCourse(int courseId, CourseDTO request) {
        LOG.info("Request received for update course");

        CommonApiResponse response = new CommonApiResponse();

        if (request == null) {
            response.setResponseMessage("Missing input");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        if (request.getId() == 0) {
            response.setResponseMessage("Missing category ID");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra xem category có tồn tại không
        Category newCategory = categoryService.getCategoryById(request.getCategoryId());
        if (newCategory == null) {
            response.setResponseMessage("Category not found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        // Cập nhật thông tin Course
        Course course = courseService.getById(courseId);
        if (course == null) {
            throw new CourseSaveFailedException("Failed to find course");
        }

        User mentor = this.userService.getUserById(request.getMentorId());

        if (mentor == null) {
            response.setResponseMessage("mentor not found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        // Chỉ lưu file mới nếu có thay đổi
        MultipartFile noteFile = storageService.getCourseNoteAndThumbnailAsMultipartFile(request.getNotesFileName());
        MultipartFile thumbnailFile = storageService.getCourseNoteAndThumbnailAsMultipartFile(request.getThumbnail());
        String courseNote = null;
        String thumbnailFilename = null;

        if (request.getNotesFileName() != null && !request.getNotesFileName().isEmpty()) {
            courseNote = this.storageService.storeCourseNote(noteFile);
        } else {
            courseNote = course.getNotesFileName(); // Giữ lại file cũ nếu không có file mới
        }

        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
            thumbnailFilename = this.storageService.storeCourseNote(thumbnailFile);
        } else {
            thumbnailFilename = course.getThumbnail(); // Giữ lại thumbnail cũ nếu không có thumbnail mới
        }

        // Chỉ cập nhật các trường có thay đổi
        if (!course.getName().equals(request.getName())) {
            course.setName(request.getName());
        }
        if (!course.getDescription().equals(request.getDescription())) {
            course.setDescription(request.getDescription());
        }
        if (!course.getFee().equals(request.getFee())) {
            course.setFee(request.getFee());
        }
        if (course.getDiscountInPercent() != (request.getDiscountInPercent())) {
            course.setDiscountInPercent(request.getDiscountInPercent());
        }
        if (!course.getAuthorCourseNote().equals(request.getAuthorCourseNote())) {
            course.setAuthorCourseNote(request.getAuthorCourseNote());
        }
        if (!course.getSpecialNote().equals(request.getSpecialNote())) {
            course.setSpecialNote(request.getSpecialNote());
        }
        if (!course.getPrerequisite().equals(request.getPrerequisite())) {
            course.setPrerequisite(request.getPrerequisite());
        }
        if (!course.getType().equals(request.getType())) {
            course.setType(request.getType());
        }
        if (courseNote != null) {
            course.setNotesFileName(courseNote);
        }
        if (thumbnailFilename != null) {
            course.setThumbnail(thumbnailFilename);
        }
        if (!course.getCategory().equals(newCategory)) {
            course.setCategory(newCategory);
        }
        if (!course.getMentor().equals(mentor)) {
            course.setMentor(mentor);
        }

        // Cập nhật thời gian thêm vào nếu có sự thay đổi
        String addedDateTime = String.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());
        course.setAddedDateTime(addedDateTime);

        // Lưu khóa học đã cập nhật
        Course saveCourse = courseService.update(course);

        if (saveCourse == null) {
            throw new CourseSaveFailedException("Failed to update course");
        }

        response.setResponseMessage("Course Updated Successfully");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // public void fetchExerciseFile(String exerciseFileName, HttpServletResponse resp) {
    //     // TODO Auto-generated method stub
    //      Resource resource = storageService.loadCourseDocument(exerciseFileName);
    //     if (resource != null && resource.exists()) {
    //         try (InputStream in = resource.getInputStream(); ServletOutputStream out = resp.getOutputStream()) {
    //             resp.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    //             FileCopyUtils.copy(in, out);
    //             out.flush();
    //         } catch (IOException e) {

    //             LOG.info("Document download interrupted or network issue!!!");

    //             e.printStackTrace();
    //             resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

    //         }
    //     } else {
    //         resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
    //     }
    // }

public void fetchExerciseFile(String exerciseFileName, HttpServletResponse resp) {

    Resource resource;

    try {
        resource = storageService.loadCourseDocument(exerciseFileName);
    } catch (Exception e) {
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return; // ⛔ return ngay
    }

    // file null hoặc không tồn tại → return
    if (resource == null || !resource.exists()) {
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return;
    }

    resp.setContentType(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    resp.setHeader(
        "Content-Disposition",
        "attachment; filename=\"" + exerciseFileName + "\""
    );

    try (
        InputStream in = resource.getInputStream();
        ServletOutputStream out = resp.getOutputStream()
    ) {
        FileCopyUtils.copy(in, out);
        out.flush();
    } catch (IOException e) {
        LOG.error("Document download failed", e);
        resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
}



//    public ResponseEntity<CourseResponseDto> fetchCoursesByStatus(String status, String videoShow) {
//
//        LOG.info("received request for fetching the courses by status");
//
//        CourseResponseDto response = new CourseResponseDto();
//
//        if (status == null || videoShow == null) {
//            response.setResponseMessage("missing input");
//            response.setSuccess(false);
//
//            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.BAD_REQUEST);
//        }
//
//        List<Course> courses = this.courseService.getByStatus(status);
//
//        if (CollectionUtils.isEmpty(courses)) {
//            response.setResponseMessage("Courses not found!!!");
//            response.setSuccess(false);
//
//            return new ResponseEntity<CourseResponseDto>(response, HttpStatus.OK);
//        }
//
//        if (videoShow.equals(Constant.CourseTopicVideoShow.NO.value())) {
//
//            for (Course course : courses) {
//                List<CourseSection> sections = course.getSections();
//                if (!CollectionUtils.isEmpty(sections)) {
//
//                    for (CourseSection section : sections) {
//
//                        List<CourseSectionTopic> topics = section.getCourseSectionTopics();
//
//                        if (!CollectionUtils.isEmpty(topics)) {
//
//                            for (CourseSectionTopic topic : topics) {
//                                topic.setVideoFileName("");
//                            }
//
//                        }
//
//                    }
//
//                }
//            }
//
//        }
//
//        response.setCourses(courses);
//        response.setResponseMessage("Courses Fetched Successful!!!");
//        response.setSuccess(true);
//
//        return new ResponseEntity<CourseResponseDto>(response, HttpStatus.OK);
//
//    }
}
