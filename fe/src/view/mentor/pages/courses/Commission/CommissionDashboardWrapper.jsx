import { useParams } from "react-router-dom";
import CommissionDashboard from "./CommissionDashboard"; // Đảm bảo đúng đường dẫn

const CommissionDashboardWrapper = () => {
  const { id } = useParams();

  return (
    <CommissionDashboard key={id} />
  );
};

export default CommissionDashboardWrapper;