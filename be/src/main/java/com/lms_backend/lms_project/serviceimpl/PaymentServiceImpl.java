package com.lms_backend.lms_project.serviceimpl;

import com.lms_backend.lms_project.dao.PaymentDAO;
import com.lms_backend.lms_project.entity.Payment;
import com.lms_backend.lms_project.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentDAO paymentDAO;

    @Override
    public Payment addPayment(Payment payment) {
        // TODO Auto-generated method stub
        return paymentDAO.save(payment);
    }
}
