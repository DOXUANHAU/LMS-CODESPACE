package com.lms_backend.lms_project.Utility;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpStore {
    private static final Map<String, String> otpMap = new ConcurrentHashMap<>();
    private static final long OTP_VALID_DURATION = 5 * 60 * 1000; // 5 phút

    private static final Map<String, Long> otpTimestampMap = new ConcurrentHashMap<>();

    public static void saveOtp(String email, String otp) {
        otpMap.put(email, otp);
        otpTimestampMap.put(email, System.currentTimeMillis());
    }

    public static String getOtp(String email) {
        Long sentTime = otpTimestampMap.get(email);
        if (sentTime == null || (System.currentTimeMillis() - sentTime > OTP_VALID_DURATION)) {
            otpMap.remove(email);
            otpTimestampMap.remove(email);
            return null; // OTP hết hạn
        }
        return otpMap.get(email);
    }

    public static void clearOtp(String email) {
        otpMap.remove(email);
        otpTimestampMap.remove(email);
    }
}

