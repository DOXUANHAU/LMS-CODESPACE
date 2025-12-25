export const formatFeeToVND = (fee) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "decimal", // Thay đổi từ "currency" thành "decimal" để không hiển thị ký hiệu ₫
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(fee) + " VNĐ"; // Thêm " VNĐ" vào sau
};