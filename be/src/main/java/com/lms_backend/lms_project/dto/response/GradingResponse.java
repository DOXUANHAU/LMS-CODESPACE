package com.lms_backend.lms_project.dto.response;

import lombok.Data;

@Data
public class GradingResponse {
    private double content;
    private double structure;
    private double grammar;
    private double argument;
    private double total;
    private String comment;
}
