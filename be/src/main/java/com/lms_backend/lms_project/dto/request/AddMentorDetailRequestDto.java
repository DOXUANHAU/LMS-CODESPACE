package com.lms_backend.lms_project.dto.request;

import com.lms_backend.lms_project.entity.MentorDetail;
import lombok.Data;
import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AddMentorDetailRequestDto {
    private int id;

    private int age;

    private String bio;

    private String highestQualification; // B Tech, B Pharm

    private String profession;

    private double experience;

    private MultipartFile profilePic;

    private String languageCertificate;

    private String degreeLevel;

    private MultipartFile selectedCertificate;

    private int mentorId;

    public static MentorDetail toEntity(AddMentorDetailRequestDto addMentorDetailRequestDto) {
        MentorDetail mentorDetail = new MentorDetail();
        BeanUtils.copyProperties(addMentorDetailRequestDto, mentorDetail, "profilePic", "mentorId", "id", "selectedCertificate");
        return mentorDetail;
    }
}
