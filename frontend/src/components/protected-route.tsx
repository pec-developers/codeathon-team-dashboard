import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/lib/store";

interface ProtectedRouteProps {
  allowedRoles: Array<"PARTICIPANT" | "ADMIN">;
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  // 1. Not authenticated? Go to standard login (participant logic usually default, but we can direct based on role if needed).
  if (!isAuthenticated || !user) {
    // We default redirect unauthenticated users hitting protected routes to their expected login.
    // If they were trying to hit an admin route, send to admin login.
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    return <Navigate to={isAdminRoute ? "/admin/login" : "/login"} replace />;
  }

  // 2. Authenticated, but role mismatch? Go to correct dashboard
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/"} replace />;
  }

  // 3. Authorized
  return <Outlet />;
}
