import { useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { StrangeTitle } from "@/components/ui/strange-title";
import { useNavigate, Navigate } from "react-router-dom";
import { Description } from "@/components/ui/description";

interface LoginProps {
  type: "PARTICIPANT" | "ADMIN";
}

export function Login({ type }: LoginProps) {
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Strict redirect if already logged in trying to hit a login page
  if (isAuthenticated && user) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/"} replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
        role: type,
      });

      const { token, role } = response.data;
      login(token, role);

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid credentials or role mismatch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 gap-6 md:gap-10">
      <div className="text-center space-y-3 max-w-sm md:max-w-lg lg:max-w-none">
        <StrangeTitle as="h2" className="mx-auto text-3xl sm:text-4xl md:text-5xl">
          {type === "ADMIN" ? "Admin Portal" : "Participant Portal"}
        </StrangeTitle>
        <p className="text-muted-foreground font-mono text-sm sm:text-base leading-relaxed px-2">
          Enter your credentials to access the codeathon dashboard. Secure access for {type.toLowerCase()}s only.
        </p>
      </div>

      <div className="w-full max-w-[400px] p-6 sm:p-8 md:p-10 border border-border/40 rounded-2xl bg-card/60 backdrop-blur-md shadow-2xl relative overflow-hidden group">
        {/* Subtle accent border top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        
        <form className="space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}
          
          <div className="space-y-2.5 flex flex-col items-start">
            <Description size="sm" className="tracking-tight pl-1 opacity-100">
              {type === "PARTICIPANT" ? "Team ID" : "Username"}
            </Description>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex h-12 w-full rounded-xl border-2 border-input bg-background/50 px-4 py-2 text-sm ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={type === "PARTICIPANT" ? "Your Team ID" : "Your username"} 
            />
          </div>

          <div className="space-y-2.5 flex flex-col items-start">
            <Description size="sm" className="tracking-tight pl-1 opacity-100">
              Password
            </Description>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-12 w-full rounded-xl border-2 border-input bg-background/50 px-4 py-2 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-md font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20" 
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Signing In...
              </span>
            ) : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
