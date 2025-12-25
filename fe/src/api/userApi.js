import axiosClient from "./axiosClient";
import { baseURL } from "./constant";

const userApi = {
  uploadAvatar: async (userId, formData) => {
    try {
      const response = await axiosClient.post(
        `${baseURL}/user/${userId}/upload-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // { success: true, avatar: "filename.jpg" }
    } catch (error) {
      console.error("Upload avatar error:", error);
      throw new Error("Upload avatar thất bại.");
    }
  },

  getAllMentors: async () => {
    try {
      const response = await axiosClient.get(`${baseURL}/user/mentor/mentors`);
      return response.data; // { success: true, mentors: [...] }
    } catch (error) {
      console.error("Get all mentors error:", error);
      throw new Error("Lấy danh sách giảng viên thất bại.");
    }
  },
  getAll: async () => {
    try {
      const response = await axiosClient.get(`${baseURL}/user/users`);
      return response.data; // { success: true, users: [...] }
    } catch (error) {
      console.error("Get all users error:", error);
      throw new Error("Lấy danh sách người dùng thất bại.");
    }
  },
};

export default userApi;