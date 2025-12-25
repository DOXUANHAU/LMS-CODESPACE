package com.lms_backend.lms_project.config;


import com.lms_backend.lms_project.Utility.Constant;
import com.lms_backend.lms_project.entity.User;
import com.lms_backend.lms_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = this.userService.getUserByEmailAndStatus(email, Constant.ActiveStatus.ACTIVE.value());

        CustomUserDetails customUserDetails = new CustomUserDetails(user);

        return customUserDetails;

    }
}

