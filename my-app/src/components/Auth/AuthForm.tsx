import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AuthFormProps {
  mode: "login" | "signup";
  onSwitchMode: () => void;
  onSubmit: (
    email: string,
    password: string,
    confirmPassword?: string
  ) => Promise<{ success: boolean; message: string }>; // 🔹 async support
}

export default function AuthForm({ mode, onSwitchMode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  // 🔹 Reset messages & fields when switching modes
  useEffect(() => {
    setMessage(null);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, [mode]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Enter a valid email address" });
      return false;
    }
    if (!passwordRegex.test(password)) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 chars, include 1 uppercase, 1 number, and 1 special character",
      });
      return false;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await onSubmit(email, password, confirmPassword); // 🔹 await async
      setMessage({ type: result.success ? "success" : "error", text: result.message });

      // 🔹 If signup succeeded → auto-switch to login
      if (mode === "signup" && result.success) {
        setTimeout(() => {
          onSwitchMode();
          setMessage({ type: "success", text: "Signup successful! Please log in." });
        }, 1000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/40 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-800"
      >
        {/* Branding */}
        <h1 className="text-3xl font-bold text-white text-center mb-2">Study Helper</h1>
        <p className="text-gray-400 text-center mb-6">
          {mode === "login" ? "Please login to continue" : "Create your account"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Enter Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Enter Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-gray-300 mb-1">Re-enter Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          )}

          {/* Messages */}
          {message && (
            <p
              className={`text-sm text-center ${
                message.type === "error" ? "text-red-500" : "text-green-400"
              }`}
            >
              {message.text}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Switch */}
        <p className="text-gray-400 text-sm text-center mt-6">
          {mode === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={onSwitchMode}
            className="text-white hover:underline cursor-pointer"
          >
            {mode === "login" ? "Create one" : "Login here"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
