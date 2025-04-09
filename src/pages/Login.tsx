import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Key, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCompany } from "@/contexts/CompanyContext";

import imageTop from "@/assets/Group 3.png";
import imageBop from "@/assets/Group 6.png";
import logo from "@/assets/Nutrix 1.png";

// Auth types
interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    companyData,
    isAltTheme,
    toggleTheme: toggleCompanyTheme,
  } = useCompany();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://webapiorg.easetrackwms.com/api/Auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify({
            username,
            password,
            grantType: "password",
            audience: "string",
            serialNo: "string",
            refreshToken: "string",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Authentication failed");
      }

      const authData: AuthResponse = await response.json();

      // Store tokens and expiration in localStorage
      localStorage.setItem("accessToken", authData.access_token);
      localStorage.setItem("refreshToken", authData.refresh_token);
      localStorage.setItem("tokenExpiry", authData.expires_at);
      localStorage.setItem("isAuthenticated", "true");

      // Extract user data from token (JWT payload)
      const tokenPayload = JSON.parse(
        atob(authData.access_token.split(".")[1])
      );
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: tokenPayload.nameid,
          name: tokenPayload.name,
          // Other user data as needed
        })
      );

      toast({
        title: "Login successful",
        description: `Welcome back, ${tokenPayload.name}!`,
      });

      navigate("/select-warehouse");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Failed to authenticate. Please check your credentials and try again."
      );
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="absolute left-4 top-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackToHome}
          className="gap-2 text-primary hover:bg-primary-50 hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="relative h-32 bg-primary">
          <motion.div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-2 shadow-lg">
              <img
                src={companyData?.logo || "/Nutrix.png"}
                alt="Company Logo"
                className="h-14 w-auto object-contain"
              />
            </div>
          </motion.div>
        </div>

        <div className="px-6 pb-8 pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="mb-2 text-center text-2xl font-bold">
              Welcome Back
            </h1>
            <p className="mb-6 text-center text-gray-500">
              Sign in to your account
            </p>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User size={16} />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Key size={16} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-600"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Example Account:
              </h3>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm space-y-2">
                <div className="flex flex-col">
                  <span className="text-gray-600">Username: air</span>
                  <span className="text-gray-600">Password: air</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary-700"
                >
                  Sign up
                </a>
              </p>
            </div>
          </motion.div>
        </div>
        {!isAltTheme && (
          <div className="bottom-0 right-0 w-full flex justify-end">
            <img src={imageBop} alt="Bottom decoration" className="w-10 h-10" />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
