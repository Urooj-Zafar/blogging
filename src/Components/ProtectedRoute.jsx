import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLogin, children }) {
  if (!isLogin) {
    return <Navigate to="/createBlog" />;
  }
  return children;
}
