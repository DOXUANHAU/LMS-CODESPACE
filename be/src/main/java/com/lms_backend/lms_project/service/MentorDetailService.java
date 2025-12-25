package com.lms_backend.lms_project.service;

import com.lms_backend.lms_project.entity.MentorDetail;

public interface MentorDetailService {
    MentorDetail addMentorDetail(MentorDetail detail);

    MentorDetail updateMentorDetail(MentorDetail detail);

    MentorDetail getById(int detailId);
}
