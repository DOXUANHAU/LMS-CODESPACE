import axiosClient from "./axiosClient";

const authApi = {
  login: async (data) => {
    const response = await axiosClient.post("/user/login", {
      emailId: data.email,
      password: data.password,
    });

    localStorage.setItem("jwtToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  },

  /// Đăng ký làm Mentor
  registerMentor: async (mentorData, user, setUser) => {
    try {
      if (!user) throw new Error("Bạn phải đăng nhập trước khi đăng ký Mentor.");
  
      let profilePicUrl = "";
      let selectedCertificateUrl = "";
      let profilePicFile = null;
      let selectedCertificatePic = "";
  
      if (mentorData.profilePic && mentorData.profilePic && mentorData.selectedCertificate instanceof File) {
        try {
          const file = mentorData.profilePic;
          profilePicFile = file;
          selectedCertificatePic = file;
          console.log("✅ Ảnh đại diện đã được tải:", profilePicUrl);
          console.log("✅ Ảnh chứng chỉ Ngôn ngữ đã được tải:", selectedCertificateUrl);
        } catch (error) {
          console.error("❌ Lỗi khi upload ảnh:", error);
          throw new Error("Không thể tải ảnh lên. Vui lòng thử lại.");
        }
      }
  
      // 🟢 Gửi dữ liệu lên Backend
      const formData = new FormData();
      if (profilePicFile) formData.append("profilePic", profilePicFile);
      if (selectedCertificatePic) formData.append("selectedCertificate", selectedCertificatePic);
      formData.append("profilePicUrl", profilePicUrl);
      formData.append("selectedCertificate", selectedCertificateUrl);
      formData.append("age", mentorData.age);
      formData.append("bio", mentorData.bio);
      formData.append("highestQualification", mentorData.highestQualification);
      formData.append("profession", mentorData.profession);
      formData.append("experience", mentorData.experience);
      formData.append("mentorId", mentorData.mentorId);
      formData.append("languageCertificate", mentorData.languageCertificate);
      formData.append("degreeLevel", mentorData.degreeLevel);

  
      try {
        const response = await axiosClient.put("/user/mentor/detail/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // ✅ Cập nhật localStorage và Context
        const updatedUser = { ...user, role: "Mentor" };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser); // ✅ Cập nhật Context để giao diện re-render

        return response.data;
      } catch (error) {
        console.error("❌ Lỗi khi gửi dữ liệu lên backend:", error);
        throw new Error("Đăng ký mentor thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("❌ Lỗi khi đăng ký Mentor:", error);
      throw error;
    }
  },
  

  register: async (data) => {
    const response = await axiosClient.post("/user/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.email,
      username: data.username,
      password: data.password,
      role: data.role || "Student",
    });

    return response.data;
  },


  verifyEmail: async (token) => {
    try {
      console.log("🔍 Sending token:", token); // Kiểm tra token trước khi gửi
      const response = await axiosClient.get(`/user/confirm?token=${token}`);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("❌ API Error:", error.response ? error.response.data : error.message);
      return { success: false }; // Tránh lỗi khi API bị lỗi
    }
  },

  // 🟢 Đăng xuất (Firebase + Xóa localStorage)
  logout: async () => {
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("❌ Lỗi khi đăng xuất:", error);
    }
  },
};

export default authApi;
