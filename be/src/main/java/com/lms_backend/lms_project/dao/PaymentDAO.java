package com.lms_backend.lms_project.dao;

import com.lms_backend.lms_project.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDAO extends JpaRepository<Payment, Integer> {
}
