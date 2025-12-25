package com.lms_backend.lms_project.service;

import com.lms_backend.lms_project.dto.request.CollaboratorRequestDto;
import com.lms_backend.lms_project.dto.response.CollaboratorResponseDto;

public interface CollaboratorService {
    void inviteCollaborator(CollaboratorRequestDto request);

    void acceptCollaborator(CollaboratorRequestDto request);

}
