import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/public/Home";
import Login from "./pages/public/auth/Login";
import Signup from "./pages/public/auth/Signup";
import Settings from "./pages/public/Settings";

import Account from "./pages/user/Account";
import Logout from "./pages/user/Logout";

import NotFound from "./pages/public/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";

import useUserStore from "./store/userStore";
import Layout from "./Layout/Layout";
import AdminLayout from "./Layout/AdminLayout";
import UsersManagement from "./pages/admin/UsersManagement";

function App() {
  const { isLogined, user } = useUserStore((state) => state);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isLogined || !user) return <Navigate to="/login" />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
    return children;
  };

  const PublicRoute = ({ children }) => {
    if (isLogined && user) {
      return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/"} />;
    }
    return children;
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          {/* Protected: User & Admin */}
          <Route
            path="/account"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Logout />
              </ProtectedRoute>
            }
          />
          {/* Protected: Admin only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersManagement />} />
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{ duration: 3000 }}
          richColors
        />
      </Layout>
    </Router>
  );
}

export default App;
