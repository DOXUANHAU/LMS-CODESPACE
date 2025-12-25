package com.lms_backend.lms_project.Utility;

import java.security.SecureRandom;
import java.util.Random;

public class Helper {

    private static final Random RANDOM = new SecureRandom();
    private static final int OTP_LENGTH = 6;

    public static String generateTourBookingId() {

        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";

        StringBuilder sb = new StringBuilder(16);
        sb.append("T-");

        for (int i = 0; i < 14; i++) {

            int index = (int) (AlphaNumericString.length() * Math.random());

            sb.append(AlphaNumericString.charAt(index));
        }

        return sb.toString().toUpperCase();
    }

    public static String generateBookingPaymentId() {

        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";

        StringBuilder sb = new StringBuilder(16);
        sb.append("P-");

        for (int i = 0; i < 14; i++) {

            int index = (int) (AlphaNumericString.length() * Math.random());

            sb.append(AlphaNumericString.charAt(index));
        }

        return sb.toString().toUpperCase();
    }

    public static String generateOtp() {
        int otp = 100000 + RANDOM.nextInt(900000);
        return String.valueOf(otp);
    }
}

