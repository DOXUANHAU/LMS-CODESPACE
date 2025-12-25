package com.lms_backend.lms_project.serviceimpl;


import java.util.List;
import java.util.Optional;

import com.lms_backend.lms_project.dao.CourseDao;
import com.lms_backend.lms_project.entity.Category;
import com.lms_backend.lms_project.entity.Course;
import com.lms_backend.lms_project.entity.User;
import com.lms_backend.lms_project.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseDao courseDao;

    @Override
    public Course add(Course course) {
        // TODO Auto-generated method stub
        return courseDao.save(course);
    }

    @Override
    public Course update(Course course) {
        // TODO Auto-generated method stub
        return courseDao.save(course);
    }

    @Override
    public Course getById(int id) {

        Optional<Course> optional = this.courseDao.findById(id);

        if (optional.isPresent()) {
            return optional.get();
        } else {
            return null;
        }

    }

    @Override
    public List<Course> getAll() {
        // TODO Auto-generated method stub
        return courseDao.findAll();
    }

    @Override
    public List<Course> getByStatus(String status) {
        // TODO Auto-generated method stub
        return courseDao.findByStatusOrderByIdDesc(status);
    }

    @Override
    public List<Course> getByMentorAndStatus(User mentor, String status) {
        // TODO Auto-generated method stub
        return courseDao.findByMentorAndStatusOrderByIdDesc(mentor, status);
    }

    @Override
    public List<Course> getByMentor(User mentor) {
        // TODO Auto-generated method stub
        return courseDao.findByMentorOrderByIdDesc(mentor);
    }

    @Override
    public List<Course> getByCategoryAndStatus(Category category, String status) {
        // TODO Auto-generated method stub
        return courseDao.findByCategoryAndStatusOrderByIdDesc(category, status);
    }

    @Override
    public List<Course> getByNameAndStatus(String name, String status) {
        // TODO Auto-generated method stub
        return courseDao.findByStatusAndNameContainingIgnoreCaseOrderByIdDesc(status, name);
    }

    @Override
    public List<Course> updateAll(List<Course> courses) {
        // TODO Auto-generated method stub
        return courseDao.saveAll(courses);
    }

    @Override
    public Long getCountByMentorAndStatus(User mentor, String status) {
        // TODO Auto-generated method stub
        return courseDao.countByMentorAndStatus(mentor, status);
    }

}

