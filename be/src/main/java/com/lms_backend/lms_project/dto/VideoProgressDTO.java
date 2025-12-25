package com.lms_backend.lms_project.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VideoProgressDTO {
    private int userId;
    private int videoId;
    private int percentWatched;
}
