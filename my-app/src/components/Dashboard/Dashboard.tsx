import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  BookOpen,
  Target,
  CheckCircle,
  Clock,
  Calendar,
  Zap,
  History,
  Trophy,
} from "lucide-react";

// ✅ Define types for our JSON structures
interface WeekPlan {
  week: string;
  goal: string;
  topics: string[];
}

interface OverallGoal {
  week: string;
  goal: string;
}

export default function Dashboard() {
  // ✅ Placeholder state for dynamic data
  const [overallGoals, setOverallGoals] = useState<OverallGoal[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<WeekPlan[]>([]);
  const [progress, setProgress] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
  });
  const [stats, setStats] = useState({
    subjects: 0,
    targetHours: 0,
    completedHours: 0,
  });
  const [studyStreak, setStudyStreak] = useState(0);
  const [studiedDays, setStudiedDays] = useState<Set<number>>(new Set());
  const [recentActivity, setRecentActivity] = useState<string[]>([]);

  // ✅ Placeholder for fetching data (localStorage/Firebase)
  useEffect(() => {
    // Example: fetch data and update state here
    // setOverallGoals(fetchedOverallGoals);
    // setWeeklyPlan(fetchedWeeklyPlan);
    // setProgress(fetchedProgress);
    // setStats(fetchedStats);
    // setStudyStreak(fetchedStreak);
    // setStudiedDays(fetchedStudiedDays);
    // setRecentActivity(fetchedActivity);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 🔹 Top Navbar */}
      <header className="w-full bg-gray-900 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">📚 Study Helper</h1>
        <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
          Logout
        </button>
      </header>

      {/* 🔹 Main Layout */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Main Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Greeting */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            Welcome back, Student 🚀
          </motion.h2>

          {/* 🔹 Progress Circles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["daily", "weekly", "monthly"].map((label) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center"
              >
                <div className="w-32 h-32 mb-4">
                  <CircularProgressbar
                    value={progress[label as keyof typeof progress]}
                    text={`${progress[label as keyof typeof progress]}%`}
                    styles={buildStyles({
                      pathColor:
                        label === "daily"
                          ? "#3b82f6"
                          : label === "weekly"
                          ? "#10b981"
                          : "#f59e0b",
                      textColor: "#fff",
                      trailColor: "#1f2937",
                      textSize: "16px",
                    })}
                  />
                </div>
                <h3 className="text-lg font-semibold">
                  {label.charAt(0).toUpperCase() + label.slice(1)} Progress
                </h3>
              </motion.div>
            ))}
          </div>

          {/* 🔹 Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-900 rounded-2xl shadow-lg flex items-center space-x-4"
            >
              <BookOpen className="w-10 h-10 text-blue-400" />
              <div>
                <p className="text-gray-400">Subjects</p>
                <h3 className="text-xl font-bold">{stats.subjects}</h3>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-900 rounded-2xl shadow-lg flex items-center space-x-4"
            >
              <Target className="w-10 h-10 text-green-400" />
              <div>
                <p className="text-gray-400">Target Hours</p>
                <h3 className="text-xl font-bold">{stats.targetHours}</h3>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-900 rounded-2xl shadow-lg flex items-center space-x-4"
            >
              <CheckCircle className="w-10 h-10 text-yellow-400" />
              <div>
                <p className="text-gray-400">Completed</p>
                <h3 className="text-xl font-bold">{stats.completedHours}</h3>
              </div>
            </motion.div>
          </div>

          {/* 🔹 Overall Goals */}
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">📌 Overall Goals</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              {overallGoals.map((goal, index) => (
                <li key={index}>
                  <span className="text-green-400">{goal.week}</span> –{" "}
                  {goal.goal}
                </li>
              ))}
            </ul>
          </div>

          {/* 🔹 Weekly Plan */}
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">🗓 Weekly Plan</h3>
            {weeklyPlan.map((plan, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold text-yellow-400">
                  {plan.week} – {plan.goal}
                </h4>
                <ul className="list-disc ml-6 text-gray-400">
                  {plan.topics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Right Side Widgets */}
        <aside className="space-y-6">
          {/* Study Streak */}
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">⏳ Study Streak</h3>
            <p className="text-gray-400">
              You’ve studied for {studyStreak} days in a row! 🔥
            </p>
          </div>

          {/* Month History Calendar */}
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" /> This Month History
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              Study activity for{" "}
              {new Date().toLocaleString("default", { month: "long" })}:
            </p>
            <div className="grid grid-cols-7 gap-2">
              {(() => {
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth();
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                return Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === today.getDate();
                  const studied = studiedDays.has(day);

                  return (
                    <div
                      key={day}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold
                      ${
                        isToday
                          ? "bg-yellow-500 text-black"
                          : studied
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {day}
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <History className="w-5 h-5 text-yellow-400" /> Recent Activity
            </h3>
            <ul className="text-sm space-y-2 text-gray-300">
              {recentActivity.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-400" /> Quick Actions
            </h3>
            <div className="flex flex-col space-y-2">
              <button className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-500 transition">
                + Add Today’s Progress
              </button>
              <button className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-green-500 transition flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4" /> Sync LeetCode Stats
              </button>
              <button className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-green-500 transition">
                📅 View Weekly Plan
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
