package com.lms_backend.lms_project.service;

import com.lms_backend.lms_project.dto.VideoProgressDTO;

public interface VideoProgressService {
    void markCompleted(int userId, int videoId);
    void saveOrUpdate(VideoProgressDTO dto);

}
