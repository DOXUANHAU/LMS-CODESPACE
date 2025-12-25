package com.lms_backend.lms_project.serviceimpl;


import com.lms_backend.lms_project.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mail;
    private final static Logger LOG = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Override
    @Async
    public void send(String to, String email) {
        try {

            MimeMessage mimeMessage = mail.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");

            mimeMessageHelper.setText(email, true);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject("Confirm your email!");
            mimeMessageHelper.setFrom("demo.admin@demo.com");
            mail.send(mimeMessage);

        } catch (MessagingException e) {
            LOG.error("Failed to send mail", e);
            throw new IllegalStateException("Failed to send mail");
        }

    }

    @Override
    @Async
    public void sendOtpEmail(String email, String otp) {
        LOG.info("Sending OTP '{}' to email '{}'", otp, email);
        try {
            MimeMessage mimeMessage = mail.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText("Mã xác thực thanh toán của bạn là: <b>" + otp + "</b>", true);
            helper.setTo(email);
            helper.setSubject("Xác nhận thanh toán khóa học");
            helper.setFrom("demo.admin@demo.com");
            mail.send(mimeMessage);
        } catch (MessagingException e) {
            LOG.error("Gửi OTP thất bại", e);
            throw new IllegalStateException("Không thể gửi OTP");
        }
    }

}
