package com.lms_backend.lms_project.serviceimpl;


import java.util.List;
import java.util.Optional;

import com.lms_backend.lms_project.dao.CourseSectionDao;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.CourseSection;
import com.lms_backend.lms_project.service.CourseSectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CourseSectionServiceImpl implements CourseSectionService {

    @Autowired
    private CourseSectionDao courseSectionDao;

    @Override
    public CourseSection add(CourseSection section) {
        // TODO Auto-generated method stub
        return courseSectionDao.save(section);
    }

    @Override
    public List<CourseSection> getByCourse(Course course) {
        // TODO Auto-generated method stub
        return courseSectionDao.findByCourse(course);
    }

    @Override
    public CourseSection getById(int section) {

        Optional<CourseSection> optional = this.courseSectionDao.findById(section);

        if (optional.isPresent()) {
            return optional.get();
        } else {
            return null;
        }

    }

}
