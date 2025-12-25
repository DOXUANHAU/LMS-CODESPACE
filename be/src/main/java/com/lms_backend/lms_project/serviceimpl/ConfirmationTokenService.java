package com.lms_backend.lms_project.serviceimpl;

import java.time.LocalDateTime;
import java.util.Optional;

import com.lms_backend.lms_project.dao.ConfirmationTokenDAO;
import com.lms_backend.lms_project.entity.ConfirmationToken;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenDAO dao;

    public Optional<ConfirmationToken> getToken(String token) {
        return dao.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return dao.updateConfirmedAt(
                token, LocalDateTime.now());
    }



    public void save(ConfirmationToken confirmationToken) {
        dao.save(confirmationToken);
    }
}
