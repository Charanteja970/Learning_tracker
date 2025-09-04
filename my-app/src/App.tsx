import React, { useState } from "react";
import AuthForm from "./components/Auth/AuthForm";

export default function App() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleAuth = (
    email: string,
    password: string,
    confirmPassword?: string
  ): { success: boolean; message: string } => {
    if (mode === "signup") {
      if (users.find((u) => u.email === email)) {
        return { success: false, message: "User already exists" };
      }
      if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match" };
      }
      setUsers([...users, { email, password }]);
      return { success: true, message: "Signup successful! Please login." };
    }

    if (mode === "login") {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        return { success: false, message: "Invalid email or password" };
      }
      setLoggedIn(true);
      return { success: true, message: "Login successful! Redirecting..." };
    }

    return { success: false, message: "Something went wrong" };
  };

  if (loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard 🚀</h1>
      </div>
    );
  }

  return (
    <AuthForm
      mode={mode}
      onSwitchMode={() => setMode(mode === "login" ? "signup" : "login")}
      onSubmit={handleAuth}
    />
  );
}
