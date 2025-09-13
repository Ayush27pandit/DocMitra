import { Navigate } from "react-router-dom";
interface ProtectedRoutesProps {
  children: React.ReactNode;
}
function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/auth" />;
}

export default ProtectedRoutes;
