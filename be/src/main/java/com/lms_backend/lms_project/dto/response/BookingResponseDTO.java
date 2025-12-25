package com.lms_backend.lms_project.dto.response;

import com.lms_backend.lms_project.entity.Booking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
public class BookingResponseDTO extends CommonApiResponse {
    private List<Booking> bookings = new ArrayList();
}
