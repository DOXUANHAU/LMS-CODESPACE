package com.lms_backend.lms_project.Utility;

public class Constant {
    public enum UserRole {
        ROLE_STUDENT("Student"), ROLE_ADMIN("Admin"), ROLE_MENTOR("Mentor");

        private String role;

        private UserRole(String role) {
            this.role = role;
        }

        public String value() {
            return this.role;
        }
    }

    public enum ActiveStatus {
        ACTIVE("Active"), DEACTIVATED("Deactivated"), DELETED("Deleted");

        private String status;

        private ActiveStatus(String status) {
            this.status = status;
        }

        public String value() {
            return this.status;
        }
    }

    public enum BookingStatus {
        CONFIRMED("Confirmed"), CANCELLED("Cancelled");

        private String status;

        private BookingStatus(String status) {
            this.status = status;
        }

        public String value() {
            return this.status;
        }
    }

    public enum CourseTopicVideoShow {
        YES("Yes"), NO("No");

        private String show;

        private CourseTopicVideoShow(String show) {
            this.show = show;
        }

        public String value() {
            return this.show;
        }
    }

    public enum CoursePurchased {
        YES("Yes"), NO("No");

        private String show;

        private CoursePurchased(String show) {
            this.show = show;
        }

        public String value() {
            return this.show;
        }
    }

    public enum CourseType {
        PAID("Paid"), FREE("Free");

        private String type;

        private CourseType(String type) {
            this.type = type;
        }

        public String value() {
            return this.type;
        }
    }
}
