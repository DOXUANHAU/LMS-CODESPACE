package com.lms_backend.lms_project.dao;

import com.lms_backend.lms_project.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressDAO extends JpaRepository<Address, Integer> {
}
