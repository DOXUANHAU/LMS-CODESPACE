package com.lms_backend.lms_project.serviceimpl;


import com.lms_backend.lms_project.dao.CourseSectionTopicDao;
import com.lms_backend.lms_project.entity.CourseSectionTopic;
import com.lms_backend.lms_project.service.CourseSectionTopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CourseSectionTopicServiceImpl implements CourseSectionTopicService {

    @Autowired
    private CourseSectionTopicDao courseSectionTopicDao;

    @Override
    public CourseSectionTopic add(CourseSectionTopic topic) {
        // TODO Auto-generated method stub
        return courseSectionTopicDao.save(topic);
    }

}

