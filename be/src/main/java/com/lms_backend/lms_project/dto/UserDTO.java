package com.lms_backend.lms_project.dto;

import com.lms_backend.lms_project.entity.Address;
import com.lms_backend.lms_project.entity.MentorDetail;
import com.lms_backend.lms_project.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int id;
    private String firebaseUid;

    private String firstName;

    private String lastName;
    private String emailId;

    private String phoneNo;

    private String role;

    private Address address;

    private MentorDetail mentorDetail;

    private String status;

    private String avatar;

    public static UserDTO toUserDtoEntity(User user) {
        UserDTO userDto = new UserDTO();
        BeanUtils.copyProperties(user, userDto);
        return userDto;
    }
}
