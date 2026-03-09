import { TopBar } from "@/components/ui/top-bar"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./pages/login"
import { ParticipantDashboard } from "./pages/participant/dashboard"
import { AdminDashboard } from "./pages/admin/dashboard"
import { ProtectedRoute } from "./components/protected-route"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen flex flex-col bg-background text-foreground relative z-10">
        {/* Top Header Navigation */}
        <TopBar />

        {/* Main Content Workspace */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-10 flex flex-col pt-24 text-center">
          <Routes>
            {/* Public/Login Routes (Redirect logic handled inside Login component) */}
            <Route path="/login" element={<Login type="PARTICIPANT" />} />
            <Route path="/admin/login" element={<Login type="ADMIN" />} />

            {/* Protected Participant Routes */}
            <Route element={<ProtectedRoute allowedRoles={["PARTICIPANT"]} />}>
              <Route path="/" element={<ParticipantDashboard />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
