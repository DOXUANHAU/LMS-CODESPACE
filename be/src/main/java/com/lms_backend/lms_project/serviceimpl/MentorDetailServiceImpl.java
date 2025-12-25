package com.lms_backend.lms_project.serviceimpl;

import java.util.Optional;

import com.lms_backend.lms_project.dao.MentorDetailDAO;
import com.lms_backend.lms_project.entity.MentorDetail;
import com.lms_backend.lms_project.service.MentorDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MentorDetailServiceImpl implements MentorDetailService {

    @Autowired
    private MentorDetailDAO mentorDetailDao;

    @Override
    public MentorDetail addMentorDetail(MentorDetail detail) {
        // TODO Auto-generated method stub
        return mentorDetailDao.save(detail);
    }

    @Override
    public MentorDetail updateMentorDetail(MentorDetail detail) {
        // TODO Auto-generated method stub
        return mentorDetailDao.save(detail);
    }

    @Override
    public MentorDetail getById(int detailId) {

        Optional<MentorDetail> optional = this.mentorDetailDao.findById(detailId);

        if (optional.isPresent()) {
            return optional.get();
        } else {
            return null;
        }

    }

}

