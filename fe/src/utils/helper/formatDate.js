export const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray)) return "Ngày không hợp lệ";
    
    try {
      // Mảng [năm, tháng (0-11), ngày, giờ, phút, giây]
      // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (0-11)
      const date = new Date(
        dateArray[0],  // năm
        dateArray[1] - 1, // tháng (trừ 1 vì JS tháng bắt đầu từ 0)
        dateArray[2],  // ngày
        dateArray[3],  // giờ
        dateArray[4],  // phút
        dateArray[5]   // giây
      );
  
      // Kiểm tra date hợp lệ
      if (isNaN(date.getTime())) {
        return "Ngày không hợp lệ";
      }
  
      // Định dạng theo tiếng Việt
      return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).format(date);
      
      // Kết quả: "03/04/2025, 10:15:17"
      
    } catch (error) {
      console.error("Lỗi khi định dạng ngày:", error);
      return "Ngày không hợp lệ";
    }
  };