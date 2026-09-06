import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    } else {
      toast({
        title: "Welcome!",
        description: "Logged in successfully",
        duration: 2000,
      });

      navigate("/invoice");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-xl">
        <CardHeader className="text-center pt-8 pb-6">
          {/* Logo */}
          <div className="mx-auto w-40 h-28 flex items-center justify-center mb-4">
            <img
              src="/Logo.png"
              alt="UrbanShine"
              className="w-40 h-28 object-contain"
            />
          </div>

          {/* Title */}
          <CardTitle className="text-3xl font-bold text-slate-800">
            Admin Login
          </CardTitle>

          {/* Subtitle */}
          <p className="text-slate-500 text-sm mt-2">
            UrbanShine Management
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Email
              </Label>

              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                autoComplete="email"
                required
                className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Password
              </Label>

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;