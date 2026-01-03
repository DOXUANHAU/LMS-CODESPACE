package com.lms_backend.lms_project;

import com.lms_backend.lms_project.Utility.Constant;
import com.lms_backend.lms_project.entity.User;
import com.lms_backend.lms_project.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@SpringBootApplication
public class LmsProjectApplication implements CommandLineRunner {

	private final Logger LOG = LoggerFactory.getLogger(LmsProjectApplication.class);

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(LmsProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		User admin = this.userService.getUserByEmailIdAndRoleAndStatus("demo.admin@demo.com",
				Constant.UserRole.ROLE_ADMIN.value(), Constant.ActiveStatus.ACTIVE.value());

		if (admin == null) {

			LOG.info("Admin not found in system, so adding default admin");
			LocalDateTime now = LocalDateTime.now();
			User user = new User();
			user.setUsername("admin");
			user.setPhoneNo("0948188712");
			user.setCreatedAt(now);
			user.setEmailId("demo.admin@demo.com");
			user.setPassword(passwordEncoder.encode("admin123"));
			user.setRole(Constant.UserRole.ROLE_ADMIN.value());
			user.setStatus(Constant.ActiveStatus.ACTIVE.value());

			this.userService.addUser(user);

		}

	}

}
